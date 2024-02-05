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
      this.setWalkingAnimationSpeed
    );
  }

  private setupInteractionAnimation(): void {
    this.interactionAnimation!.onAnimationGroupEndObservable.add(() => {
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
  }

  @bind
  private rotateCharacter(): void {
    const velocity = this.getCharacterVelocity();

    if (velocity.length() > this.rotationVelocityThreshold) {
      velocity.normalize();
      let desiredRotation = Math.atan2(velocity.x, velocity.z);

      this.characterRotationNode.rotationQuaternion = Quaternion.RotationAxis(
        Axis.Y,
        desiredRotation
      );
    }
  }

  @bind
  private removeRotationObserver(): void {
    if (this.rotationObserverRef)
      this.scenePresenter.Scene.onBeforeRenderObservable.remove(
        this.rotationObserverRef
      );
  }

  @bind
  private onBeforeAnimationTransitionObserver(
    from: AnimationGroup,
    to: AnimationGroup,
    observerToRemove: Nullable<Observer<Scene>>,
    blendValueIncrementFunction: () => number,
    transitionFinishedCallback?: () => void
  ): void {
    this.animationBlendValue += blendValueIncrementFunction();

    if (this.animationBlendValue >= 1) {
      from.setWeightForAllAnimatables(0.0);
      to.setWeightForAllAnimatables(1.0);

      this.scenePresenter.Scene.onBeforeAnimationsObservable.remove(
        observerToRemove
      );
    } else {
      from.setWeightForAllAnimatables(1.0 - this.animationBlendValue);
      to.setWeightForAllAnimatables(this.animationBlendValue);
    }
  }

  @bind
  private transitionFromIdleToWalk(): void {
    this.rotationObserverRef =
      this.scenePresenter.Scene.onBeforeRenderObservable.add(
        this.rotateCharacter
      );

    this.animationBlendValue = 0;
    const observer = this.scenePresenter.Scene.onBeforeAnimationsObservable.add(
      () => {
        this.onBeforeAnimationTransitionObserver(
          this.idleAnimation,
          this.walkAnimation,
          observer,
          this.getVelocityAnimationInterpolationIncrement
        );
      }
    );
  }

  @bind
  private transitionFromWalkToIdle(): void {
    this.animationBlendValue = 0;
    const observer = this.scenePresenter.Scene.onBeforeAnimationsObservable.add(
      () => {
        this.onBeforeAnimationTransitionObserver(
          this.walkAnimation,
          this.idleAnimation,
          observer,
          () => this.getTimedAnimationInterpolationIncrement(100),
          this.removeRotationObserver
        );
      }
    );
  }

  @bind
  private transitionFromIdleOrWalkToInteract(): void {
    this.animationBlendValue = 0;
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

    const observer = this.scenePresenter.Scene.onBeforeAnimationsObservable.add(
      () => {
        this.onBeforeAnimationTransitionObserver(
          fromAnimation,
          this.interactionAnimation!,
          observer,
          () => this.getTimedAnimationInterpolationIncrement(100),
          this.removeRotationObserver
        );
      }
    );
  }

  @bind
  private transitionFromInteractToIdle(): void {
    this.animationBlendValue = 0;
    const observer = this.scenePresenter.Scene.onBeforeAnimationsObservable.add(
      () => {
        this.onBeforeAnimationTransitionObserver(
          this.interactionAnimation!,
          this.idleAnimation,
          observer,
          () => this.getTimedAnimationInterpolationIncrement(50)
        );
      }
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

  @bind
  private setWalkingAnimationSpeed(): void {
    if (this.stateMachine.CurrentState !== CharacterAnimationStates.Walking)
      return;

    let velocity = this.getCharacterVelocity().length();
    this.walkAnimation.speedRatio = Math.max(velocity, 1);
  }
}
