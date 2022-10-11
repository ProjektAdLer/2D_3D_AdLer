import {
  ArcRotateCamera,
  ArcRotateCameraMouseWheelInput,
  ArcRotateCameraPointersInput,
  Axis,
  LinesMesh,
  Mesh,
  MeshBuilder,
  Quaternion,
  TransformNode,
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
import SpaceSceneDefinition from "../SceneManagement/Scenes/SpaceSceneDefinition";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";

const modelLink = require("../../../../../Assets/3DModel_Avatar_Character_male.glb");

export default class AvatarView {
  private scenePresenter: IScenePresenter;
  private navigation: INavigation;
  private navigationReady: boolean = false;

  constructor(
    private viewModel: AvatarViewModel,
    private controller: IAvatarController
  ) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(SpaceSceneDefinition);

    // setup event callback for internal navigation setup after global scene navigation setup is completed
    this.navigation = CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation);
    this.navigation.onNavigationReadyObservable.subscribe(
      () => (this.navigationReady = true)
    );

    this.loadAvatarAsync();
  }

  private async loadAvatarAsync(): Promise<void> {
    this.viewModel.parentNode.Value = new TransformNode(
      "AvatarParentNode",
      this.scenePresenter.Scene
    );

    await this.loadMeshAsync();
    this.createCamera();

    while (!this.navigationReady) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.setupAvatarNavigation();
  }

  @bind
  private setupAvatarNavigation(): void {
    this.viewModel.agentIndex = this.navigation.Crowd.addAgent(
      this.viewModel.meshes.Value[0].position,
      this.viewModel.agentParams,
      this.viewModel.parentNode.Value
    );
    this.scenePresenter.Scene.onBeforeRenderObservable.add(this.moveAvatar);

    this.navigation.onNavigationReadyObservable.unsubscribe(
      this.setupAvatarNavigation
    );
  }

  private async loadMeshAsync(): Promise<void> {
    this.viewModel.meshes.Value = (await this.scenePresenter.loadModel(
      modelLink
    )) as Mesh[];

    this.viewModel.meshes.Value[0].setParent(this.viewModel.parentNode.Value);

    // place model 0.1 above the ground ~ FK
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

  // temporary until babylon component is better structured
  private createCamera(): void {
    // Set FollowCamera to follow the avatar (~FK):
    let camera = new ArcRotateCamera(
      "AvatarCamera",
      Math.PI / 4,
      Math.PI / 4,
      20,
      this.viewModel.parentNode.Value.position,
      this.scenePresenter.Scene
    );

    // add camera zoom
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 30;
    camera.inputs.attached.mousewheel.attachControl();
    (
      camera.inputs.attached.mousewheel as ArcRotateCameraMouseWheelInput
    ).wheelDeltaPercentage = 0.01;

    // add camera rotation
    camera.upperBetaLimit = Math.PI / 2;
    camera.inputs.attached.pointers.attachControl();
    // only rotate with the left mouse button (index: 0)
    (camera.inputs.attached.pointers as ArcRotateCameraPointersInput).buttons =
      [0];

    // set camera parent
    camera.parent = this.viewModel.parentNode.Value;
    this.scenePresenter.Scene.activeCamera = camera;
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

        /* istanbul ignore next */
        if (config.isDebug) {
          this.debug_displayVelocity(
            this.viewModel,
            this.scenePresenter,
            velocity,
            desiredRotation
          );
        }

        this.viewModel.meshes.Value[0].rotationQuaternion =
          Quaternion.RotationAxis(Axis.Y, desiredRotation);
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
