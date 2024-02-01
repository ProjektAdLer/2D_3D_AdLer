import {
  Vector3,
  IAgentParameters,
  TransformNode,
  Quaternion,
  Axis,
  MeshBuilder,
  StandardMaterial,
  Color3,
  LinesMesh,
  Nullable,
  Observer,
  Scene,
} from "@babylonjs/core";
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
import { injectable } from "inversify";

@injectable()
export default class CharacterNavigator
  extends Readyable
  implements ICharacterNavigator
{
  private readonly agentParams: IAgentParameters = {
    radius: 0.5,
    height: 1,
    maxAcceleration: 5000.0,
    maxSpeed: 3.0,
    collisionQueryRange: 20.0,
    pathOptimizationRange: 0.0,
    separationWeight: 1.0,
    reachRadius: 0.4, // acts as stopping distance
  };
  private readonly rotationVelocityThreshold: number = 0.5;

  private navigation: INavigation;
  private scenePresenter: IScenePresenter;
  private agentIndex: number;
  private rotationObserverRef: Nullable<Observer<Scene>>;
  private targetReachedObserverRef: Nullable<
    Observer<{ agentIndex: number; destination: Vector3 }>
  >;
  private parentNode: TransformNode;
  private characterRotationNode: TransformNode;
  private characterAnimator: ICharacterAnimator;
  private verbose: boolean = false;

  private debug_pathLine: LinesMesh;

  constructor() {
    super();
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
    this.navigation = CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation);
  }

  public setup(
    parentNode: TransformNode,
    characterRotationNode: TransformNode,
    characterAnimator: ICharacterAnimator,
    verbose?: boolean
  ): void {
    this.parentNode = parentNode;
    this.characterRotationNode = characterRotationNode;
    this.characterAnimator = characterAnimator;
    if (verbose) this.verbose = verbose;

    this.asyncSetup();
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
  private async asyncSetup(): Promise<void> {
    await this.navigation.IsReady;

    // snap to navmesh if character is placed outside of it
    this.parentNode.position = this.navigation.Plugin.getClosestPoint(
      this.parentNode.position
    );

    // make sure rotation node has quaternion set
    if (!this.characterRotationNode.rotationQuaternion)
      this.characterRotationNode.rotationQuaternion = new Quaternion();

    this.agentIndex = this.navigation.Crowd.addAgent(
      this.parentNode.position,
      this.agentParams,
      this.parentNode
    );

    // commenting this debug code solves avatar spawn bug
    this.debug_drawCircle(this.agentParams.radius, Color3.Blue());
    this.debug_drawCircle(this.agentParams.reachRadius!, Color3.Red());

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

  private debug_drawCircle(radius: number, color?: Color3): void {
    if (this.verbose === false) return;

    const circle = MeshBuilder.CreateTorus(
      "debug radius",
      {
        diameter: radius * 2,
        thickness: 0.03,
        tessellation: 32,
      },
      this.scenePresenter.Scene
    );

    if (color) {
      const material = new StandardMaterial(
        "debug radius material",
        this.scenePresenter.Scene
      );
      material.diffuseColor = color;
      circle.material = material;
    }

    circle.position = this.parentNode.position;
    circle.setParent(this.parentNode);
  }
}
