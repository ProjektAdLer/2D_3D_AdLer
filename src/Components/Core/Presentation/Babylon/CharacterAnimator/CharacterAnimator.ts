import bind from "bind-decorator";
import StateMachine from "../../Utils/StateMachine/StateMachine";
import {
  AnimationGroup,
  Axis,
  Observer,
  Quaternion,
  Scene,
} from "@babylonjs/core";
import type { Nullable, TransformNode, Vector3 } from "@babylonjs/core";
import CharacterAnimationStates from "./CharacterAnimationStates";
import CharacterAnimationActions from "./CharacterAnimationActions";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import ICharacterAnimator from "./ICharacterAnimator";
import { injectable } from "inversify";

@injectable()
export default class CharacterAnimator implements ICharacterAnimator {
  private readonly rotationVelocityThreshold: number = 0.5;

  private stateMachine = new StateMachine<
    CharacterAnimationStates,
    CharacterAnimationActions
  >(CharacterAnimationStates.Idle, []);
  private animationBlendValue: number = 0;
  private rotationObserverRef: Nullable<Observer<Scene>>;
  private transitionObserverRef: Nullable<Observer<Scene>>;
  private transitionFinishedCallback: Nullable<() => void>;
  private scenePresenter: IScenePresenter;
  private getCharacterVelocity: () => Vector3;
  private characterRotationNode: TransformNode;
  private idleAnimation: AnimationGroup;
  private walkAnimation: AnimationGroup;
  private interactionAnimation?: AnimationGroup;

  public setup(
    getCharacterVelocity: () => Vector3,
    characterRotationNode: TransformNode,
    idleAnimation: AnimationGroup,
    walkAnimation: AnimationGroup,
    interactionAnimation?: AnimationGroup
  ): void {
    this.getCharacterVelocity = getCharacterVelocity;
    this.characterRotationNode = characterRotationNode;
    this.idleAnimation = idleAnimation;
    this.walkAnimation = walkAnimation;
    this.interactionAnimation = interactionAnimation;

    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);

    // make sure rotation node has quaternion set
    if (!this.characterRotationNode.rotationQuaternion)
      this.characterRotationNode.rotationQuaternion = new Quaternion();

    this.setupIdleAnimation();
    this.setupWalkAnimation();
    if (this.interactionAnimation) this.setupInteractionAnimation();
  }

  public transition(action: CharacterAnimationActions): void {
    this.stateMachine.applyAction(action);
  }

  // -- State Machine Setup --

  private setupIdleAnimation(): void {
    this.idleAnimation.play(true);
    this.idleAnimation.setWeightForAllAnimatables(1.0);
  }

  private setupWalkAnimation(): void {
    this.walkAnimation.play(true);
    this.walkAnimation.setWeightForAllAnimatables(0.0);

    this.stateMachine.addTransition({
      action: CharacterAnimationActions.MovementStarted,
      from: CharacterAnimationStates.Idle,
      to: CharacterAnimationStates.Walking,
      onTransitionCallback: this.transitionFromIdleToWalk,
    });
    this.stateMachine.addTransition({
      action: CharacterAnimationActions.TargetReached,
      from: CharacterAnimationStates.Walking,
      to: CharacterAnimationStates.Idle,
      onTransitionCallback: this.transitionFromWalkToIdle,
    });

    this.scenePresenter.Scene.onBeforeRenderObservable.add(
      this.walkingStateOnBeforeRenderCallback
    );
  }

  @bind
  private walkingStateOnBeforeRenderCallback(): void {
    if (this.stateMachine.CurrentState === CharacterAnimationStates.Walking) {
      const absoluteVelocity = this.getCharacterVelocity().length();

      this.setWalkingAnimationSpeed(absoluteVelocity);
      this.rotateCharacter(absoluteVelocity);
    }
  }

  private setWalkingAnimationSpeed(absoluteVelocity: number): void {
    this.walkAnimation.speedRatio = Math.max(absoluteVelocity, 0);
  }

  private rotateCharacter(absoluteVelocity: number): void {
    if (absoluteVelocity > this.rotationVelocityThreshold) {
      const normalizedVelocity = this.getCharacterVelocity().normalize();
      const desiredRotation = Math.atan2(
        normalizedVelocity.x,
        normalizedVelocity.z
      );

      this.characterRotationNode.rotationQuaternion = Quaternion.RotationAxis(
        Axis.Y,
        desiredRotation
      );
    }
  }

  private setupInteractionAnimation(): void {
    this.interactionAnimation!.onAnimationGroupEndObservable.add(() => {
      if (
        this.stateMachine.CurrentState === CharacterAnimationStates.Interaction
      )
        this.stateMachine.applyAction(
          CharacterAnimationActions.InteractionFinished
        );
    });

    this.interactionAnimation!.setWeightForAllAnimatables(0.0);

    this.stateMachine.addTransition({
      action: CharacterAnimationActions.InteractionStarted,
      from: CharacterAnimationStates.Idle,
      to: CharacterAnimationStates.Interaction,
      onTransitionCallback: this.transitionFromIdleOrWalkToInteract,
    });
    this.stateMachine.addTransition({
      action: CharacterAnimationActions.InteractionFinished,
      from: CharacterAnimationStates.Interaction,
      to: CharacterAnimationStates.Idle,
      onTransitionCallback: this.transitionFromInteractToIdle,
    });
    this.stateMachine.addTransition({
      action: CharacterAnimationActions.MovementStarted,
      from: CharacterAnimationStates.Interaction,
      to: CharacterAnimationStates.Walking,
      onTransitionCallback: this.transitionFromInteractToWalk,
    });
  }

  // -- Animation Transition Management --

  private createOnBeforeAnimationTransitionObserver(
    from: AnimationGroup,
    to: AnimationGroup,
    blendValueIncrementFunction: () => number
  ) {
    if (this.transitionObserverRef !== null) {
      this.cleanupOnBeforeAnimationTransitionObserver();
    }

    this.animationBlendValue = 0;
    from.setWeightForAllAnimatables(1.0);
    to.setWeightForAllAnimatables(0.0);

    this.transitionObserverRef =
      this.scenePresenter.Scene.onBeforeAnimationsObservable.add(() => {
        this.onBeforeAnimationTransitionObserver(
          from,
          to,
          blendValueIncrementFunction
        );
      });
  }

  @bind
  private onBeforeAnimationTransitionObserver(
    fromAnimation: AnimationGroup,
    toAnimation: AnimationGroup,
    blendValueIncrementFunction: () => number
  ): void {
    this.animationBlendValue += blendValueIncrementFunction();

    if (this.animationBlendValue >= 1) {
      fromAnimation.setWeightForAllAnimatables(0.0);
      toAnimation.setWeightForAllAnimatables(1.0);

      this.cleanupOnBeforeAnimationTransitionObserver();
    } else {
      fromAnimation.setWeightForAllAnimatables(1.0 - this.animationBlendValue);
      toAnimation.setWeightForAllAnimatables(this.animationBlendValue);
    }
  }

  private cleanupOnBeforeAnimationTransitionObserver(): void {
    this.scenePresenter.Scene.onBeforeAnimationsObservable.remove(
      this.transitionObserverRef
    );
    this.transitionObserverRef = null;

    this.transitionFinishedCallback?.();
    this.transitionFinishedCallback = null;
  }

  // -- Animation Transition Functions --

  @bind
  private transitionFromIdleToWalk(): void {
    this.createOnBeforeAnimationTransitionObserver(
      this.idleAnimation,
      this.walkAnimation,
      () => this.getVelocityAnimationInterpolationIncrement()
    );
  }

  @bind
  private transitionFromWalkToIdle(): void {
    this.createOnBeforeAnimationTransitionObserver(
      this.walkAnimation,
      this.idleAnimation,
      () => this.getTimedAnimationInterpolationIncrement(100)
    );
  }

  @bind
  private transitionFromIdleOrWalkToInteract(): void {
    let fromAnimation: AnimationGroup;
    switch (this.stateMachine.CurrentState) {
      case CharacterAnimationStates.Idle:
        fromAnimation = this.idleAnimation;
        break;
      case CharacterAnimationStates.Walking:
        fromAnimation = this.walkAnimation!;
        break;
    }

    this.interactionAnimation!.play(false);

    this.createOnBeforeAnimationTransitionObserver(
      fromAnimation!,
      this.interactionAnimation!,
      () => this.getTimedAnimationInterpolationIncrement(100)
    );
  }

  @bind
  private transitionFromInteractToIdle(): void {
    this.createOnBeforeAnimationTransitionObserver(
      this.interactionAnimation!,
      this.idleAnimation,
      () => this.getTimedAnimationInterpolationIncrement(100)
    );
  }

  @bind
  private transitionFromInteractToWalk(): void {
    this.createOnBeforeAnimationTransitionObserver(
      this.interactionAnimation!,
      this.walkAnimation,
      () => this.getVelocityAnimationInterpolationIncrement()
    );
  }

  @bind
  private getVelocityAnimationInterpolationIncrement(): number {
    return (
      this.getCharacterVelocity().length() / this.scenePresenter.Scene.deltaTime
    );
  }

  @bind
  private getTimedAnimationInterpolationIncrement(
    transitionTimeInMs: number
  ): number {
    return this.scenePresenter.Scene.deltaTime / transitionTimeInMs;
  }
}
