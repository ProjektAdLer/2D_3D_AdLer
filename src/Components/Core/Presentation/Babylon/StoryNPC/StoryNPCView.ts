import LearningElementModelLookup from "src/Components/Core/Domain/LearningElementModels/LearningElementModelLookup";
import IStoryNPCController from "./IStoryNPCController";
import StoryNPCViewModel from "./StoryNPCViewModel";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import { Mesh } from "@babylonjs/core";

import iconLink from "../../../../../Assets/3dModels/sharedModels/l-icons-h5p-1.glb";

export default class StoryNPCView {
  private scenePresenter: IScenePresenter;
  constructor(
    private viewModel: StoryNPCViewModel,
    private controller: IStoryNPCController
  ) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
  }

  public async setupStoryNPC(): Promise<void> {
    await Promise.all([this.loadElementModel(), this.loadIconModel()]);
  }

  private async loadElementModel(): Promise<void> {
    let modelLink;
    modelLink = LearningElementModelLookup[this.viewModel.modelType];

    this.viewModel.modelMeshes = (await this.scenePresenter.loadModel(
      modelLink,
      true
    )) as Mesh[];
  }

  private async loadIconModel(): Promise<void> {
    this.viewModel.iconMeshes = (await this.scenePresenter.loadModel(
      iconLink
    )) as Mesh[];
  }
}
