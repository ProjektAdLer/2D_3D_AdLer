import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import DecorationViewModel from "./DecorationViewModel";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import { Mesh, Vector3 } from "@babylonjs/core";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
const modelLinkLShape = require("../../../../../Assets/3dModels/campusTheme/dLShape Sampleroom - Deko.glb");
const modelLink2x2 = require("../../../../../Assets/3dModels/campusTheme/d2x2Shape Sampleroom - Deko.glb");
const modelLink2x3 = require("../../../../../Assets/3dModels/campusTheme/d2x3Shape Sampleroom - Deko.glb");

export default class DecorationView {
  private scenePresenter: IScenePresenter;
  constructor(private viewModel: DecorationViewModel) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
  }

  public async asyncSetup(): Promise<void> {
    //TODO: Refactor this when we have a better Decoration System in AdLer
    let results;
    switch (this.viewModel.learningSpaceTemplateType.Value) {
      case LearningSpaceTemplateType.L:
        results = await this.scenePresenter.loadModel(modelLinkLShape, true);
        break;
      case LearningSpaceTemplateType.R6:
        results = await this.scenePresenter.loadModel(modelLink2x2, true);
        break;
      case LearningSpaceTemplateType.R8:
        results = await this.scenePresenter.loadModel(modelLink2x3, true);
        break;
      default:
        return;
    }
    this.viewModel.meshes.Value = results as Mesh[];
    this.viewModel.meshes.Value.forEach((mesh) => {
      mesh.translate(new Vector3(0, -0.05, 0), 1);
    });
  }
}
