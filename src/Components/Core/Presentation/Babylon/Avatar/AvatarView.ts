import { FollowCamera, Mesh, SceneLoader } from "@babylonjs/core";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import ISceneController from "../SceneManagement/ISceneController";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";

const modelLink = require("../../../../../Assets/PlaceholderCharacter.glb");

export default class AvatarView {
  private sceneController: ISceneController;

  constructor(
    private viewModel: AvatarViewModel,
    private controller: IAvatarController
  ) {
    this.sceneController = CoreDIContainer.get<ISceneController>(
      CORE_TYPES.ISceneController
    );

    this.loadMeshAsync();
  }

  private async loadMeshAsync(): Promise<void> {
    const result = await SceneLoader.ImportMeshAsync(
      "",
      modelLink,
      "",
      this.sceneController.Scene
    );

    this.viewModel.meshes.Value = result.meshes as Mesh[];

    // Set FollowCamera to follow the avatar (~FK):
    var camera = this.sceneController.Scene.cameras[0];
    (camera as FollowCamera).lockedTarget = result.meshes[0];
  }
}
