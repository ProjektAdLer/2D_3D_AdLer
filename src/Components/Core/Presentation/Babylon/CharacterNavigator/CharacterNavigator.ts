import {
  Vector3,
  IAgentParameters,
  TransformNode,
  Quaternion,
  Axis,
  MeshBuilder,
} from "@babylonjs/core";
import type { LinesMesh, Nullable, Observer, Scene } from "@babylonjs/core";
import bind from "bind-decorator";
import INavigation from "../Navigation/INavigation";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ICharacterAnimator from "../CharacterAnimator/ICharacterAnimator";
import CharacterAnimationActions from "../CharacterAnimator/CharacterAnimationActions";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import ICharacterNavigator from "./ICharacterNavigator";
import Readyable from "src/Lib/Readyable";

export default class CharacterNavigator
  extends Readyable
  implements ICharacterNavigator
{
  private readonly agentParams: IAgentParameters = {
    radius: 1,
    height: 1,
    maxAcceleration: 5000.0,
    maxSpeed: 3.0,
    collisionQueryRange: 0.5,
    pathOptimizationRange: 0.0,
    separationWeight: 1.0,
    reachRadius: 0.2, // acts as stopping distance
  };
  private readonly rotationVelocityThreshold: number = 0.5;

  private navigation: INavigation;
  private scenePresenter: IScenePresenter;
  private agentIndex: number;
  private rotationObserverRef: Nullable<Observer<Scene>>;
  private targetReachedObserverRef: Nullable<
    Observer<{ agentIndex: number; destination: Vector3 }>
  >;

  private debug_pathLine: LinesMesh;

  constructor(
    private parentNode: TransformNode,
    private characterRotationNode: TransformNode,
    private characterAnimator: ICharacterAnimator,
    private verbose: boolean = false
  ) {
    super();

    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
    this.navigation = CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation);

    this.setupCharacterNavigation();
  }

  public get CharacterVelocity(): Vector3 {
    return this.navigation.Crowd.getAgentVelocity(this.agentIndex);
  }

  public startMovement(
    target: Vector3,
    onTargetReachedCallback?: () => void
  ): void {
    this.navigation.Crowd.agentGoto(this.agentIndex, target);
    this.characterAnimator.transition(
      CharacterAnimationActions.MovementStarted
    );

    this.rotationObserverRef =
      this.scenePresenter.Scene.onBeforeRenderObservable.add(
        this.rotateCharacter
      );
    this.targetReachedObserverRef =
      this.navigation.Crowd.onReachTargetObservable.add(
        (eventData: { agentIndex: number }) => {
          if (eventData.agentIndex === this.agentIndex) {
            if (onTargetReachedCallback) onTargetReachedCallback();
            this.stopMovement();
          }
        }
      );

    this.debug_drawPath(target);
  }

  @bind
  public stopMovement(): void {
    this.navigation.Crowd.agentTeleport(
      this.agentIndex,
      this.parentNode.position
    );
    this.characterAnimator.transition(CharacterAnimationActions.TargetReached);

    this.scenePresenter.Scene.onBeforeRenderObservable.remove(
      this.rotationObserverRef
    );
    this.navigation.Crowd.onReachTargetObservable.remove(
      this.targetReachedObserverRef
    );
  }

  @bind
  private async setupCharacterNavigation(): Promise<void> {
    await this.navigation.IsReady;

    // snap to navmesh if character is placed outside of it
    this.parentNode.position = this.navigation.Plugin.getClosestPoint(
      this.parentNode.position
    );

    // make sure rotation node has quaternion set
    this.characterRotationNode.rotationQuaternion = new Quaternion(0, 0, 0, 1);

    this.agentIndex = this.navigation.Crowd.addAgent(
      this.parentNode.position,
      this.agentParams,
      this.parentNode
    );

    this.resolveIsReady();
  }

  @bind
  private rotateCharacter(): void {
    const velocity = this.navigation.Crowd.getAgentVelocity(this.agentIndex);

    if (velocity.length() > this.rotationVelocityThreshold) {
      velocity.normalize();
      let desiredRotation = Math.atan2(velocity.x, velocity.z);

      this.characterRotationNode.rotationQuaternion = Quaternion.RotationAxis(
        Axis.Y,
        desiredRotation
      );
    }
  }

  private debug_drawPath(target: Vector3): void {
    if (this.verbose === false) return;

    let pathPoints = this.navigation.Plugin.computePath(
      this.navigation.Crowd.getAgentPosition(this.agentIndex),
      target
    );
    this.debug_pathLine = MeshBuilder.CreateDashedLines(
      "navigation path",
      { points: pathPoints, updatable: true, instance: this.debug_pathLine },
      this.scenePresenter.Scene
    );
  }
}
