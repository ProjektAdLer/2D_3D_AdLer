import { ArcFollowCamera, Mesh, Quaternion } from "@babylonjs/core";
import { inject, injectable } from "inversify";
import IAvatarPort, {
  AvatarTO,
} from "../../../Application/LoadAvatar/IAvatarPort";
import BUILDER_TYPES from "../../../DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import IPresentationBuilder from "../../PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";
import type IScenePresenter from "../SceneManagement/IScenePresenter";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarPresenter from "./IAvatarPresenter";

const modelLink = require("../../../../../Assets/Avatar_Character.glb");

/**
 * @class AvatarPresenter
 * @description Presenter and Port for the Avatar. The first call to presentAvatar creates View, ViewModel and Controller for the Avatar.
 */
@injectable()
export default class AvatarPresenter implements IAvatarPresenter, IAvatarPort {
  private viewModel: AvatarViewModel;

  public set ViewModel(newViewModel: AvatarViewModel) {
    this.viewModel = newViewModel;
  }

  constructor(
    @inject(CORE_TYPES.IScenePresenter) private scenePresenter: IScenePresenter
  ) {}

  async presentAvatar(avatarTO: AvatarTO): Promise<void> {
    if (!this.viewModel) {
      let director = CoreDIContainer.get<IPresentationDirector>(
        BUILDER_TYPES.IPresentationDirector
      );
      let builder = CoreDIContainer.get<IPresentationBuilder>(
        BUILDER_TYPES.IAvatarBuilder
      );
      director.Builder = builder;
      director.build();

      // inititialize the avatar
      await this.loadMeshAsync();
      this.createCamera();
    }
    // TODO: apply avatar customization here
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
    new ArcFollowCamera(
      "ArcFollowCamera",
      0,
      Math.PI / 4,
      20,
      this.viewModel.meshes.Value[0],
      this.scenePresenter.Scene
    );
  }
}
