import {
  Axis,
  LinesMesh,
  Mesh,
  MeshBuilder,
  Quaternion,
  Vector3,
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

const modelLink = require("../../../../../Assets/3DModel_Avatar_Character2.0_ale.glb");
export default class AvatarView {
  isReady: Promise<void>;

  private scenePresenter: IScenePresenter;
  private navigation: INavigation;

  constructor(
    private viewModel: AvatarViewModel,
    private controller: IAvatarController
  ) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
    this.navigation = CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation);

    // start async setup
    this.isReady = this.asyncSetup();
  }

  private async asyncSetup(): Promise<void> {
    await this.loadAvatarAsync();
    await this.navigation.isReady.then(this.setupAvatarNavigation);

    return Promise.resolve();
  }

  private async loadAvatarAsync(): Promise<void> {
    this.viewModel.parentNode.Value =
      this.scenePresenter.Scene.getTransformNodeByName("AvatarParentNode")!;

    this.viewModel.meshes.Value = (await this.scenePresenter.loadModel(
      modelLink
    )) as Mesh[];

    this.viewModel.meshes.Value[0].setParent(this.viewModel.parentNode.Value);

    // place model 0.05 above the ground ~ FK
    this.viewModel.meshes.Value[0].position = new Vector3(0, 0.05, 0);
    this.viewModel.meshes.Value[0].scaling = new Vector3(1, 1, -1);
    this.viewModel.meshes.Value.forEach(
      (mesh) => (mesh.rotationQuaternion = null)
    );
    this.viewModel.meshes.Value[0].rotationQuaternion = new Quaternion(
      0,
      0,
      0,
      1
    );
  }

  @bind
  private async setupAvatarNavigation(): Promise<void> {
    this.viewModel.agentIndex = this.navigation.Crowd.addAgent(
      this.viewModel.meshes.Value[0].position,
      this.viewModel.agentParams,
      this.viewModel.parentNode.Value
    );
    this.scenePresenter.Scene.onBeforeRenderObservable.add(this.moveAvatar);
  }

  @bind
  private moveAvatar(): void {
    if (this.viewModel.meshes.Value.length > 0) {
      this.viewModel.parentNode.Value.position =
        this.navigation.Crowd.getAgentPosition(this.viewModel.agentIndex);
      let velocity = this.navigation.Crowd.getAgentVelocity(
        this.viewModel.agentIndex
      );

      if (velocity.length() > 0.2) {
        velocity.normalize();
        let desiredRotation = Math.atan2(velocity.x, velocity.z);

        this.viewModel.meshes.Value[0].rotationQuaternion =
          Quaternion.RotationAxis(Axis.Y, desiredRotation);

        /* istanbul ignore next */
        if (config.isDebug) {
          this.debug_displayVelocity(
            this.viewModel,
            this.scenePresenter,
            velocity,
            desiredRotation
          );
        }
      }
    }
  }

  // TODO: this debug function needs to be excluded from the build
  private velocityLine: LinesMesh;
  private counter: number = 0;

  private debug_displayVelocity = (
    viewModel: AvatarViewModel,
    scenePresenter: IScenePresenter,
    velocity: Vector3,
    rotation: number
  ): void => {
    if (this.counter % 10 === 0) {
      let points: Vector3[] = [
        viewModel.parentNode.Value.position,
        viewModel.parentNode.Value.position.add(velocity),
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
          rotation +
          " " +
          viewModel.meshes.Value[0].rotationQuaternion?.y
      );
    }
    this.counter++;
  };
}
