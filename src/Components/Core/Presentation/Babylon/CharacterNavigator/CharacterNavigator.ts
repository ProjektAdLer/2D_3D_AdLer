import {
  Vector3,
  IAgentParameters,
  TransformNode,
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
import CharacterAnimationStates from "../CharacterAnimator/CharacterAnimationStates";

@injectable()
export default class CharacterNavigator
  extends Readyable
  implements ICharacterNavigator
{
  private readonly agentParams: IAgentParameters = {
    radius: 0.3,
    height: 1,
    maxAcceleration: 30.0,
    maxSpeed: 3.5,
    collisionQueryRange: 2,
    pathOptimizationRange: 0.0,
    separationWeight: 1.0,
    reachRadius: 0.2, // acts as stopping distance
  };
  private readonly earlyStoppingPatience = 400; // in ms
  private readonly earlyStoppingVelocityThreshold = 0.3;

  private navigation: INavigation;
  private scenePresenter: IScenePresenter;
  private characterAnimator: ICharacterAnimator;
  private agentIndex: number;
  private targetReachedObserverRef: Nullable<
    Observer<{ agentIndex: number; destination: Vector3 }>
  >;
  private targetReachedCallback: (() => void) | null;
  private parentNode: TransformNode;
  private verbose: boolean = false;
  private checkEarlyStoppingObserverRef: Nullable<Observer<Scene>>;
  private earlyStoppingCounter = 0;

  private debug_pathLine: LinesMesh;

  constructor() {
    super();
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory,
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
    this.navigation = CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation);
  }

  public setup(
    parentNode: TransformNode,
    characterAnimator: ICharacterAnimator,
    verbose?: boolean,
  ): void {
    this.parentNode = parentNode;
    this.characterAnimator = characterAnimator;
    if (verbose) this.verbose = verbose;

    this.asyncSetup();
  }

  public get CharacterVelocity(): Vector3 {
    return this.navigation.Crowd.getAgentVelocity(this.agentIndex);
  }

  public startMovement(
    target: Vector3,
    onTargetReachedCallback?: () => void,
  ): void {
    // only actually move to new target if transition was successful or character is already walking
    const transitionSuccessful = this.characterAnimator.transition(
      CharacterAnimationActions.MovementStarted,
    );
    if (
      !transitionSuccessful &&
      this.characterAnimator.CurrentAnimationState !==
        CharacterAnimationStates.Walking
    )
      return;

    this.resetObservers();

    target = this.navigation.Plugin.getClosestPoint(target);
    this.navigation.Crowd.agentGoto(this.agentIndex, target);

    // setup observers
    this.checkEarlyStoppingObserverRef =
      this.scenePresenter.Scene.onBeforeRenderObservable.add(
        this.checkEarlyStopping,
      );
    this.targetReachedCallback = onTargetReachedCallback ?? null;
    this.targetReachedObserverRef =
      this.navigation.Crowd.onReachTargetObservable.add(
        (eventData: { agentIndex: number }) => {
          if (eventData.agentIndex === this.agentIndex) {
            if (onTargetReachedCallback) onTargetReachedCallback();
            this.stopMovement();
          }
        },
      );

    this.debug_drawPath(target);
  }

  @bind
  public stopMovement(): void {
    this.navigation.Crowd.agentTeleport(
      this.agentIndex,
      this.parentNode.position,
    );
    this.characterAnimator.transition(CharacterAnimationActions.TargetReached);

    this.resetObservers();
  }

  @bind
  private async asyncSetup(): Promise<void> {
    await this.navigation.IsReady;

    // snap to navmesh if character is placed outside of it
    this.parentNode.position = this.navigation.Plugin.getClosestPoint(
      this.parentNode.position,
    );

    this.agentIndex = this.navigation.Crowd.addAgent(
      this.parentNode.position,
      this.agentParams,
      this.parentNode,
    );

    this.debug_drawCircle(this.agentParams.radius, Color3.Blue());
    this.debug_drawCircle(this.agentParams.reachRadius!, Color3.Red());

    this.resolveIsReady();
  }

  @bind
  private checkEarlyStopping(scene: Scene): void {
    const velocity = this.navigation.Crowd.getAgentVelocity(
      this.agentIndex,
    ).length();

    if (velocity < this.earlyStoppingVelocityThreshold) {
      this.earlyStoppingCounter += scene.deltaTime;

      if (this.earlyStoppingCounter >= this.earlyStoppingPatience) {
        if (this.targetReachedCallback) this.targetReachedCallback();
        this.stopMovement();
        this.earlyStoppingCounter = 0;
      }
    } else this.earlyStoppingCounter = 0;
  }

  private resetObservers(): void {
    if (this.targetReachedObserverRef !== null) {
      this.navigation.Crowd.onReachTargetObservable.remove(
        this.targetReachedObserverRef,
      );
      this.targetReachedObserverRef = null;
    }
    if (this.checkEarlyStoppingObserverRef !== null) {
      this.scenePresenter.Scene.onBeforeRenderObservable.remove(
        this.checkEarlyStoppingObserverRef,
      );
      this.checkEarlyStoppingObserverRef = null;
    }
    if (this.targetReachedCallback !== null) this.targetReachedCallback = null;
  }

  private debug_drawPath(target: Vector3): void {
    if (this.verbose === false) return;

    let pathPoints = this.navigation.Plugin.computePath(
      this.navigation.Crowd.getAgentPosition(this.agentIndex),
      target,
    );
    this.debug_pathLine = MeshBuilder.CreateDashedLines(
      "navigation path",
      { points: pathPoints, updatable: true, instance: this.debug_pathLine },
      this.scenePresenter.Scene,
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
      this.scenePresenter.Scene,
    );

    if (color) {
      const material = new StandardMaterial(
        "debug radius material",
        this.scenePresenter.Scene,
      );
      material.diffuseColor = color;
      circle.material = material;
    }

    circle.position = this.parentNode.position;
    circle.setParent(this.parentNode);
  }

  @bind
  public removeAgent(): void {
    this.stopMovement();
    this.navigation.Crowd.removeAgent(this.agentIndex);
  }

  public hideAgent(): void {
    this.agentParams.separationWeight = 0.0;
  }

  public showAgent(): void {
    this.agentParams.separationWeight = 1.0;
  }
}
