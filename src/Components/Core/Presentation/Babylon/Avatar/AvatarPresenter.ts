import { FollowCamera, Mesh } from "@babylonjs/core";
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

const modelLink = require("../../../../../Assets/Avatar_Pinguin.glb");

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
      this.setupNavigation();
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

    // Set FollowCamera to follow the avatar (~FK):
    var camera = this.scenePresenter.Scene.cameras[0];
    (camera as FollowCamera).lockedTarget = this.viewModel.meshes.Value[0];
  }

  private async setupNavigation(): Promise<void> {
    // this.viewModel.agentIndex = this.scenePresenter.NavigationCrowd.addAgent(
    //   this.viewModel.meshes.Value[0].position,
    //   this.viewModel.agentParams,
    //   this.viewModel.meshes.Value[0]
    // );
  }
}
