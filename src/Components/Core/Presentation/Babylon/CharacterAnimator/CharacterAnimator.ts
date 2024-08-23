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
  private transitionObserverRef: Nullable<Observer<Scene>>;
  private lastTransitionFromAnimation: Nullable<AnimationGroup>;
  private lastTransitionToAnimation: Nullable<AnimationGroup>;

  private idleAnimation: AnimationGroup;
  private walkAnimation: AnimationGroup;
  private interactionAnimation?: AnimationGroup;
  private scenePresenter: IScenePresenter;

  private getCharacterVelocity: () => Vector3;
  private characterRotationNode: TransformNode;

  public get CurrentAnimationState(): CharacterAnimationStates {
    return this.stateMachine.CurrentState;
  }

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

  public transition(action: CharacterAnimationActions): boolean {
    return this.stateMachine.applyAction(action);
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
    this.walkAnimation.speedRatio = Math.max(absoluteVelocity, 0.1);
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
      this.transition(CharacterAnimationActions.InteractionFinished);
    });

    this.stateMachine.addTransition({
      action: CharacterAnimationActions.InteractionStarted,
      from: CharacterAnimationStates.Idle,
      to: CharacterAnimationStates.Interaction,
      onTransitionCallback: () =>
        this.transitionFromAnyToInteract(this.idleAnimation),
    });
    this.stateMachine.addTransition({
      action: CharacterAnimationActions.InteractionStarted,
      from: CharacterAnimationStates.Walking,
      to: CharacterAnimationStates.Interaction,
      onTransitionCallback: () =>
        this.transitionFromAnyToInteract(this.walkAnimation),
    });
    this.stateMachine.addTransition({
      action: CharacterAnimationActions.InteractionStarted,
      from: CharacterAnimationStates.Interaction,
      to: CharacterAnimationStates.Interaction,
      onTransitionCallback: () =>
        this.transitionFromAnyToInteract(this.interactionAnimation!),
    });
    this.stateMachine.addTransition({
      action: CharacterAnimationActions.InteractionFinished,
      from: CharacterAnimationStates.Interaction,
      to: CharacterAnimationStates.Idle,
      onTransitionCallback: () =>
        this.transitionFromInteractToAny(this.idleAnimation),
    });
    this.stateMachine.addTransition({
      action: CharacterAnimationActions.MovementStarted,
      from: CharacterAnimationStates.Interaction,
      to: CharacterAnimationStates.Walking,
      onTransitionCallback: () =>
        this.transitionFromInteractToAny(this.walkAnimation),
    });
  }

  // -- Animation Transition Management --

  private createOnBeforeAnimationTransitionObserver(
    from: AnimationGroup,
    to: AnimationGroup,
    blendValueIncrementFunction: () => number
  ) {
    // reset animation weights from last transition if not part of new transition
    // this ensures a valid end state of the last transition
    if (
      this.lastTransitionFromAnimation &&
      this.lastTransitionFromAnimation !== from &&
      this.lastTransitionFromAnimation !== to
    ) {
      this.lastTransitionFromAnimation.setWeightForAllAnimatables(0);
      this.lastTransitionFromAnimation = null;
    }
    if (
      this.lastTransitionToAnimation &&
      this.lastTransitionToAnimation !== from &&
      this.lastTransitionToAnimation !== to
    ) {
      this.lastTransitionToAnimation.setWeightForAllAnimatables(1);
      this.lastTransitionToAnimation = null;
    }

    // setup blend value
    const startBlendValue = from.animatables[0]
      ? 1 - from.animatables[0].weight
      : 0;
    // wrap animation blend value in object to get passed by reference
    const animationBlendValueObject = { value: startBlendValue };

    // set starting weights
    from.setWeightForAllAnimatables(1 - startBlendValue);
    to.setWeightForAllAnimatables(startBlendValue);

    // setup transition observer
    this.cleanupOnBeforeAnimationTransitionObserver();
    this.transitionObserverRef =
      this.scenePresenter.Scene.onBeforeAnimationsObservable.add(() => {
        this.onBeforeAnimationTransitionObserver(
          from,
          to,
          animationBlendValueObject,
          blendValueIncrementFunction
        );
      });
  }

  @bind
  private onBeforeAnimationTransitionObserver(
    fromAnimation: AnimationGroup,
    toAnimation: AnimationGroup,
    animationBlendValueObject: { value: number }, // wrapped in object to get passed by reference
    blendValueIncrementFunction: () => number
  ): void {
    animationBlendValueObject.value += blendValueIncrementFunction();

    if (animationBlendValueObject.value >= 1) {
      // transition finished - set final weights and cleanup
      fromAnimation.setWeightForAllAnimatables(0);
      toAnimation.setWeightForAllAnimatables(1);

      this.cleanupOnBeforeAnimationTransitionObserver();
    } else {
      // transition still in progress - set new weights
      fromAnimation.setWeightForAllAnimatables(
        1.0 - animationBlendValueObject.value
      );
      toAnimation.setWeightForAllAnimatables(animationBlendValueObject.value);
    }
  }

  private cleanupOnBeforeAnimationTransitionObserver(): void {
    if (!this.transitionObserverRef) return;

    this.scenePresenter.Scene.onBeforeAnimationsObservable.remove(
      this.transitionObserverRef
    );
    this.transitionObserverRef = null;
  }

  // -- Animation Transition Functions --

  @bind
  private transitionFromIdleToWalk(): void {
    this.createOnBeforeAnimationTransitionObserver(
      this.idleAnimation,
      this.walkAnimation,
      () => Math.max(this.getVelocityAnimationInterpolationIncrement(), 0.1)
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
  private transitionFromAnyToInteract(fromAnimation: AnimationGroup): void {
    this.interactionAnimation!.play(false);
    this.interactionAnimation!.goToFrame(this.interactionAnimation!.from);
    this.interactionAnimation!.setWeightForAllAnimatables(0);

    this.createOnBeforeAnimationTransitionObserver(
      fromAnimation!,
      this.interactionAnimation!,
      () => this.getTimedAnimationInterpolationIncrement(100)
    );
  }

  @bind
  private transitionFromInteractToAny(toAnimation: AnimationGroup): void {
    this.interactionAnimation?.stop();
    toAnimation.play(true);
    toAnimation.setWeightForAllAnimatables(1);
  }

  // -- Transition Blending Increment Functions --

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
