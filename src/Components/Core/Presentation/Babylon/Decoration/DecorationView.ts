import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import DecorationViewModel from "./DecorationViewModel";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import { Mesh, Vector3 } from "@babylonjs/core";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import LearningSpaceThemeLookup from "src/Components/Core/Domain/LearningSpaceThemes/LearningSpaceThemeLookup";
import LearningSpaceTheme_Campus from "src/Components/Core/Domain/LearningSpaceThemes/LearningSpaceTheme_Campus";
import LearningSpaceTheme_Arcade from "src/Components/Core/Domain/LearningSpaceThemes/LearningSpaceTheme_Arcade";
import LearningSpaceTheme_Suburb from "src/Components/Core/Domain/LearningSpaceThemes/LearningSpaceTheme_Suburb";
import IDecorationTheme from "./IDecorationTheme";
import DecorationTheme_Campus from "./DecorationTheme_Campus";
import DecorationTheme_Arcade from "./DecorationTheme_Arcade";
import DecorationTheme_Suburb from "./DecorationTheme_Suburb";

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
    let results = await this.setupSpaceDecorationModels();
    if (!results) return;
    this.viewModel.meshes.Value = results as Mesh[];
    this.viewModel.meshes.Value.forEach((mesh) => {
      mesh.translate(new Vector3(0, -0.05, 0), 1);
    });
  }

  private async setupSpaceDecorationModels(): Promise<any> {
    let theme: IDecorationTheme;

    switch (
      LearningSpaceThemeLookup.getLearningSpaceTheme(this.viewModel.theme)
    ) {
      case LearningSpaceTheme_Campus:
        theme = DecorationTheme_Campus;
        break;
      case LearningSpaceTheme_Arcade:
        theme = DecorationTheme_Arcade;
        break;
      case LearningSpaceTheme_Suburb:
        theme = DecorationTheme_Suburb;
        break;
      default:
        theme = DecorationTheme_Campus;
        break;
    }

    let results;
    switch (this.viewModel.learningSpaceTemplateType.Value) {
      case LearningSpaceTemplateType.L:
        results = await this.scenePresenter.loadModel(
          theme.modelLinkLShape,
          true
        );
        break;
      case LearningSpaceTemplateType.R6:
        results = await this.scenePresenter.loadModel(theme.modelLink2x2, true);
        break;
      case LearningSpaceTemplateType.R8:
        results = await this.scenePresenter.loadModel(theme.modelLink2x3, true);
        break;
      default:
        return;
    }
    return results;
  }
}
