import { Mesh, SceneLoader, FollowCamera } from "@babylonjs/core";
import bind from "bind-decorator";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";

const modelLink = require("../../../../../Assets/Avatar_Pinguin.glb");

export default class AvatarView {
  private scenePresenter: IScenePresenter;

  constructor(
    private viewModel: AvatarViewModel,
    private controller: IAvatarController
  ) {
    this.scenePresenter = CoreDIContainer.get<IScenePresenter>(
      CORE_TYPES.IScenePresenter
    );

    this.loadMeshAsync();

    this.setupNavigation();

    // setup event callback for avatar animation
    this.scenePresenter.Scene.onBeforeRenderObservable.add(this.moveAvatar);
  }

  private async loadMeshAsync(): Promise<void> {
    const result = await SceneLoader.ImportMeshAsync(
      "",
      modelLink,
      "",
      this.scenePresenter.Scene
    );

    this.viewModel.meshes.Value = result.meshes as Mesh[];

    result.meshes.forEach((mesh) => (mesh.rotationQuaternion = null));

    // Set FollowCamera to follow the avatar (~FK):
    var camera = this.scenePresenter.Scene.cameras[0];
    (camera as FollowCamera).lockedTarget = result.meshes[0];
  }

  private async setupNavigation(): Promise<void> {
    this.viewModel.agentIndex = this.scenePresenter.NavigationCrowd.addAgent(
      this.viewModel.meshes.Value[0].position,
      this.viewModel.agentParams,
      this.viewModel.meshes.Value[0]
    );
  }

  @bind
  private moveAvatar(): void {
    if (this.viewModel.meshes.Value.length > 0) {
      this.viewModel.meshes.Value[0].position =
        this.scenePresenter.NavigationCrowd.getAgentPosition(0);

      let vel = this.scenePresenter.NavigationCrowd.getAgentVelocity(
        this.viewModel.agentIndex
      );

      if (vel.length() > 0.2) {
        vel.normalize();
        var desiredRotation = Math.atan2(vel.x, vel.z);
        this.viewModel.meshes.Value[0].rotation.y =
          this.viewModel.meshes.Value[0].rotation.y +
          (desiredRotation - this.viewModel.meshes.Value[0].rotation.y) * 0.05;
      }
    }
  }
}
