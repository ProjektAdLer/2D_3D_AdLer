import {
  ArcFollowCamera,
  Axis,
  LinesMesh,
  Mesh,
  MeshBuilder,
  Quaternion,
  Vector3,
} from "@babylonjs/core";
import bind from "bind-decorator";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import INavigation from "../Navigation/INavigation";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";

const modelLink = require("../../../../../Assets/3DModel_Avatar_Character.glb");

export default class AvatarView {
  private scenePresenter: IScenePresenter;
  private navigation: INavigation;

  constructor(
    private viewModel: AvatarViewModel,
    private controller: IAvatarController
  ) {
    this.scenePresenter = CoreDIContainer.get<IScenePresenter>(
      CORE_TYPES.IScenePresenter
    );
    this.navigation = CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation);

    this.loadAvatarAsync();

    // setup event callback for internal navigation setup after global scene navigation setup is completed
    this.navigation.onNavigationReadyObservable.subscribe(
      this.setupAvatarNavigation
    );
  }

  private async loadAvatarAsync(): Promise<void> {
    await this.loadMeshAsync();
    this.createCamera();
  }

  @bind
  private setupAvatarNavigation(): void {
    this.viewModel.agentIndex = this.navigation.Crowd.addAgent(
      this.viewModel.meshes.Value[0].position,
      this.viewModel.agentParams,
      this.viewModel.meshes.Value[0]
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
    let camera = new ArcFollowCamera(
      "ArcFollowCamera",
      0,
      Math.PI / 4,
      20,
      this.viewModel.meshes.Value[0],
      this.scenePresenter.Scene
    );
    this.scenePresenter.Scene.activeCamera = camera;
  }

  @bind
  private moveAvatar(): void {
    if (this.viewModel.meshes.Value.length > 0) {
      this.viewModel.meshes.Value[0].position =
        this.navigation.Crowd.getAgentPosition(this.viewModel.agentIndex);
      let velocity = this.navigation.Crowd.getAgentVelocity(
        this.viewModel.agentIndex
      );

      if (velocity.length() > 0.2) {
        velocity.normalize();
        let desiredRotation = Math.atan2(velocity.x, velocity.z);

        debug_displayVelocity(
          this.viewModel,
          this.scenePresenter,
          velocity,
          desiredRotation
        );

        this.viewModel.meshes.Value[0].rotationQuaternion =
          Quaternion.RotationAxis(Axis.Y, desiredRotation);
      }
    }
  }
}

// TODO: this debug function needs to be excluded from the build
let velocityLine: LinesMesh;
let counter: number = 0;

let debug_displayVelocity = (
  viewModel: AvatarViewModel,
  scenePresenter: IScenePresenter,
  velocity: Vector3,
  rotation: number
): void => {
  if (counter % 10 === 0) {
    let points: Vector3[] = [
      viewModel.meshes.Value[0].position,
      viewModel.meshes.Value[0].position.add(velocity),
    ];
    velocityLine = MeshBuilder.CreateDashedLines(
      "avatar velocity",
      {
        points: points,
        updatable: true,
        instance: velocityLine,
      },
      scenePresenter.Scene
    );
    console.log(
      velocity.toString() +
        " " +
        rotation +
        " " +
        viewModel.meshes.Value[0].rotationQuaternion?.y
    );
  }
  counter++;
};
