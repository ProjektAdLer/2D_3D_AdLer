import bind from "bind-decorator";
import StateMachine from "../../Utils/StateMachine/StateMachine";
import { AnimationGroup, Observer, Scene } from "@babylonjs/core";
import type { Nullable } from "@babylonjs/core";
import CharacterAnimationStates from "./CharacterAnimationStates";
import CharacterAnimationActions from "./CharacterAnimationActions";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import IScenePresenter from "../SceneManagement/IScenePresenter";

export default class CharacterAnimator {
  private stateMachine: StateMachine<
    CharacterAnimationStates,
    CharacterAnimationActions
  >;
  private animationBlendValue: number = 0;
  private scenePresenter: IScenePresenter;

  constructor(
    private idleAnimation: AnimationGroup,
    private walkAnimation?: AnimationGroup,
    private interactionAnimation?: AnimationGroup
  ) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);

    this.stateMachine = new StateMachine<
      CharacterAnimationStates,
      CharacterAnimationActions
    >(CharacterAnimationStates.Idle, []);

    this.setupIdleAnimation();
    if (this.walkAnimation) this.setupWalkAnimation();
    if (this.interactionAnimation) this.setupInteractionAnimation();
  }

  private setupIdleAnimation(): void {
    this.idleAnimation.play(true);
    this.idleAnimation.setWeightForAllAnimatables(1.0);
  }

  private setupWalkAnimation(): void {
    this.walkAnimation!.play(true);
    this.walkAnimation!.setWeightForAllAnimatables(0.0);

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
  private onBeforeAnimationTransitionObserver(
    from: AnimationGroup,
    to: AnimationGroup,
    observerToRemove: Nullable<Observer<Scene>>,
    blendValueIncrementFunction: () => number
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
    this.animationBlendValue = 0;
    const observer = this.scenePresenter.Scene.onBeforeAnimationsObservable.add(
      () => {
        this.onBeforeAnimationTransitionObserver(
          this.idleAnimation,
          this.walkAnimation!,
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
          this.walkAnimation!,
          this.idleAnimation,
          observer,
          () => this.getTimedAnimationInterpolationIncrement(100)
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
          () => this.getTimedAnimationInterpolationIncrement(100)
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
      this.navigation.Crowd.getAgentVelocity(
        this.viewModel.agentIndex
      ).length() / this.scenePresenter.Scene.deltaTime
    );
  }

  @bind
  private getTimedAnimationInterpolationIncrement(
    transitionTimeInMs: number
  ): number {
    return this.scenePresenter.Scene.deltaTime / transitionTimeInMs;
  }
}
