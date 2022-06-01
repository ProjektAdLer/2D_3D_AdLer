import { FollowCamera, Mesh, SceneLoader } from "@babylonjs/core";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";

const modelLink = require("../../../../../Assets/PlaceholderCharacter.glb");

export default class AvatarView {
  private scenePresenter: IScenePresenter;

  constructor(
    private viewModel: AvatarViewModel,
    private controller: IAvatarController
  ) {
    this.scenePresenter = CoreDIContainer.get<IScenePresenter>(
      CORE_TYPES.IscenePresenter
    );

    this.loadMeshAsync();
  }

  private async loadMeshAsync(): Promise<void> {
    const result = await SceneLoader.ImportMeshAsync(
      "",
      modelLink,
      "",
      this.scenePresenter.Scene
    );

    this.viewModel.meshes.Value = result.meshes as Mesh[];

    // Set FollowCamera to follow the avatar (~FK):
    var camera = this.scenePresenter.Scene.cameras[0];
    (camera as FollowCamera).lockedTarget = result.meshes[0];
  }
}
