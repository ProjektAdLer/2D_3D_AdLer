import {
  Axis,
  LinesMesh,
  Mesh,
  MeshBuilder,
  Quaternion,
  Vector3,
} from "@babylonjs/core";
import type {
  AnimationGroup,
  Nullable,
  Observer,
  Scene,
} from "@babylonjs/core";
import bind from "bind-decorator";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import { config } from "../../../../../config";
import { logger } from "../../../../../Lib/Logger";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import INavigation from "../Navigation/INavigation";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";
import StateMachine, { IStateMachine } from "./StateMachine";
import IMovementIndicator from "../MovementIndicator/IMovementIndicator";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import { on } from "events";

const modelLink = require("../../../../../Assets/3dModels/defaultTheme/3DModel_Avatar_male.glb");

export enum AnimationState {
  Idle,
  Walking,
}
export enum AnimationAction {
  MovementStarted,
  TargetReached,
}

export default class AvatarView {
  private scenePresenter: IScenePresenter;
  private navigation: INavigation;
  private animationStateMachine: IStateMachine<AnimationState, AnimationAction>;
  private movementIndicator: IMovementIndicator;
  private animationBlendValue = 0;

  constructor(
    private viewModel: AvatarViewModel,
    private controller: IAvatarController
  ) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
    this.navigation = CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation);
    this.movementIndicator = CoreDIContainer.get<IMovementIndicator>(
      PRESENTATION_TYPES.IMovementIndicator
    );

    viewModel.movementTarget.subscribe(this.onMovementTargetChanged);
  }

  public async asyncSetup(): Promise<void> {
    await this.loadAvatarAsync();
    this.setupAvatarAnimations();
    await this.navigation.IsReady.then(this.setupAvatarNavigation);
  }

  private async loadAvatarAsync(): Promise<void> {
    this.viewModel.parentNode =
      this.scenePresenter.Scene.getTransformNodeByName("AvatarParentNode")!;

    this.viewModel.meshes = (await this.scenePresenter.loadModel(
      modelLink
    )) as Mesh[];

    this.viewModel.meshes[0].setParent(this.viewModel.parentNode);

    // place model 0.05 above the ground ~ FK
    this.viewModel.parentNode.position = this.viewModel.spawnPoint;
    this.viewModel.meshes[0].position = new Vector3(0, 0.05, 0);
    this.viewModel.meshes[0].scaling = new Vector3(1, 1, -1);
    this.viewModel.meshes.forEach((mesh) => (mesh.rotationQuaternion = null));
    this.viewModel.meshes[0].rotationQuaternion = new Quaternion(0, 0, 0, 1);
  }

  private setupAvatarAnimations(): void {
    this.viewModel.idleAnimation =
      this.scenePresenter.Scene.getAnimationGroupByName("IdleAnimation")!;
    this.viewModel.walkAnimation =
      this.scenePresenter.Scene.getAnimationGroupByName("WalkCycle")!;

    // animations need to be playing for the weights to have an effect
    this.viewModel.idleAnimation.play(true);
    this.viewModel.walkAnimation.play(true);

    this.viewModel.idleAnimation.setWeightForAllAnimatables(1.0);
    this.viewModel.walkAnimation.setWeightForAllAnimatables(0.0);

    this.animationStateMachine = new StateMachine<
      AnimationState,
      AnimationAction
    >(AnimationState.Idle, [
      {
        action: AnimationAction.MovementStarted,
        from: AnimationState.Idle,
        to: AnimationState.Walking,
        onTransitionCallback: this.transitionFromIdleToWalk,
      },
      {
        action: AnimationAction.TargetReached,
        from: AnimationState.Walking,
        to: AnimationState.Idle,
        onTransitionCallback: this.transitionFromWalkToIdle,
      },
    ]);
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
          this.viewModel.idleAnimation,
          this.viewModel.walkAnimation,
          observer,
          this.getIdleToWalkInterpolationIncrement
        );
      }
    );
  }

  @bind
  private getIdleToWalkInterpolationIncrement(): number {
    return (
      this.navigation.Crowd.getAgentVelocity(
        this.viewModel.agentIndex
      ).length() / this.scenePresenter.Scene.deltaTime
    );
  }

  @bind
  private transitionFromWalkToIdle(): void {
    this.animationBlendValue = 0;
    const observer = this.scenePresenter.Scene.onBeforeAnimationsObservable.add(
      () => {
        this.onBeforeAnimationTransitionObserver(
          this.viewModel.walkAnimation,
          this.viewModel.idleAnimation,
          observer,
          this.getWalkToIdleInterpolationIncrement
        );
      }
    );
  }

  @bind
  private getWalkToIdleInterpolationIncrement(): number {
    return this.scenePresenter.Scene.deltaTime / 100;
  }

  @bind
  private setupAvatarNavigation(): void {
    // snap to navmesh
    this.viewModel.parentNode.position = this.navigation.Plugin.getClosestPoint(
      this.viewModel.parentNode.position
    );

    this.viewModel.agentIndex = this.navigation.Crowd.addAgent(
      this.viewModel.parentNode.position,
      this.viewModel.agentParams,
      this.viewModel.parentNode
    );

    this.navigation.Crowd.onReachTargetObservable.add(
      this.onReachMovementTarget
    );
    this.scenePresenter.Scene.onBeforeRenderObservable.add(this.moveAvatar);
  }

  @bind
  private onMovementTargetChanged(newTarget: Nullable<Vector3>): void {
    // skip if changed to null
    if (newTarget === null) return;

    this.movementIndicator.display(newTarget);
    this.animationStateMachine.applyAction(AnimationAction.MovementStarted);
  }

  @bind
  private onReachMovementTarget(): void {
    this.movementIndicator.hide();
    this.animationStateMachine.applyAction(AnimationAction.TargetReached);
    this.navigation.Crowd.agentTeleport(
      this.viewModel.agentIndex,
      this.viewModel.parentNode.position
    );
    this.viewModel.movementTarget.Value = null;
  }

  @bind
  private moveAvatar(): void {
    if (this.viewModel.meshes.length > 0) {
      const velocity = this.navigation.Crowd.getAgentVelocity(
        this.viewModel.agentIndex
      );

      // match walk animation speed to velocity
      this.viewModel.walkAnimation.speedRatio = Math.max(velocity.length(), 1);

      /* istanbul ignore next */
      if (config.isDebug) {
        this.debug_displayVelocity(
          this.viewModel,
          this.scenePresenter,
          velocity
        );
      }

      // rotate avatar to face movement direction
      // for velocities below a threshold the avatar will not rotate to prevent jittering
      if (velocity.length() > 0.5) {
        velocity.normalize();
        let desiredRotation = Math.atan2(velocity.x, velocity.z);

        this.viewModel.meshes[0].rotationQuaternion = Quaternion.RotationAxis(
          Axis.Y,
          desiredRotation
        );
        // TODO: fix rotation overflow bug
        // this.viewModel.meshes[0].rotationQuaternion = Quaternion.RotationAxis(
        //   Axis.Y,
        //   this.viewModel.meshes[0].rotationQuaternion!.toEulerAngles().y +
        //     (desiredRotation -
        //       this.viewModel.meshes[0].rotationQuaternion!.toEulerAngles().y) *
        //       0.1
        // );
      }
    }
  }

  // TODO: this debug function should be excluded from the build
  private velocityLine: LinesMesh;
  private counter: number = 0;

  private debug_displayVelocity = (
    viewModel: AvatarViewModel,
    scenePresenter: IScenePresenter,
    velocity: Vector3
  ): void => {
    if (this.counter % 10 === 0) {
      let points: Vector3[] = [
        viewModel.parentNode.position,
        viewModel.parentNode.position.add(velocity),
      ];
      this.velocityLine = MeshBuilder.CreateDashedLines(
        "avatar velocity",
        {
          points: points,
          updatable: true,
          instance: this.velocityLine,
        },
        scenePresenter.Scene
      );

      logger.log(
        velocity.toString() +
          " " +
          velocity.length() +
          "\n" +
          viewModel.meshes[0].rotationQuaternion?.y
      );
    }
    this.counter++;
  };
}
