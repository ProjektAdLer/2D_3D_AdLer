import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import DecorationViewModel from "./DecorationViewModel";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import { Mesh, Vector3 } from "@babylonjs/core";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import bind from "bind-decorator";
const modelLinkLShape = require("../../../../../Assets/prototype/LShape Sampleroom - Deko.glb");
const modelLink2x2 = require("../../../../../Assets/prototype/2x2Shape Sampleroom - Deko.glb");
const modelLink2x3 = require("../../../../../Assets/prototype/2x3Shape Sampleroom - Deko.glb");

export default class DecorationView {
  private scenePresenter: IScenePresenter;
  constructor(private viewModel: DecorationViewModel) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
    this.viewModel.learningSpaceTemplateType.subscribe(
      this.asyncDecorationSetup
    );
  }
  @bind
  private async asyncDecorationSetup(): Promise<void> {
    await this.loadDecorationMeshAsync();
  }
  private async loadDecorationMeshAsync(): Promise<void> {
    //TODO: Refactor this when we have a better Decoration System in AdLer
    let results;
    switch (this.viewModel.learningSpaceTemplateType.Value) {
      case LearningSpaceTemplateType.L:
        results = await this.scenePresenter.loadModel(modelLinkLShape);
        break;
      case LearningSpaceTemplateType.R6:
        results = await this.scenePresenter.loadModel(modelLink2x2);
        break;
      case LearningSpaceTemplateType.R8:
        results = await this.scenePresenter.loadModel(modelLink2x3);
        break;
    }
    this.viewModel.meshes.Value = results as Mesh[];
    this.viewModel.meshes.Value.forEach((mesh) => {
      mesh.translate(new Vector3(0, -0.05, 0), 1);
    });
  }
}
