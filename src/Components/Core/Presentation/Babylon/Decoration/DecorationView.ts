import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import DecorationViewModel from "./DecorationViewModel";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import { AbstractMesh, Mesh, Vector3 } from "@babylonjs/core";
import { LearningSpaceTemplateType } from "src/Components/Core/Domain/Types/LearningSpaceTemplateType";
import LearningSpaceThemeLookup from "src/Components/Core/Domain/LearningSpaceThemes/LearningSpaceThemeLookup";

export default class DecorationView {
  constructor(private viewModel: DecorationViewModel) {}

  public async asyncSetup(): Promise<void> {
    await this.loadSpaceDecorationModels().then((results) => {
      this.viewModel.insideMeshes = results.insideDeco as Mesh[];
      this.viewModel.outsideMeshes = results.outsideDeco as Mesh[];

      this.viewModel.insideMeshes.forEach((mesh) => {
        mesh.translate(new Vector3(0, -0.05, 0), 1);
      });
      this.viewModel.outsideMeshes.forEach((mesh) => {
        mesh.translate(new Vector3(0, -0.05, 0), 1);
      });
    });
  }

  private async loadSpaceDecorationModels(): Promise<{
    insideDeco: AbstractMesh[];
    outsideDeco: AbstractMesh[];
  }> {
    if (
      this.viewModel.learningSpaceTemplateType ===
      LearningSpaceTemplateType.None
    ) {
      return { insideDeco: [], outsideDeco: [] };
    }

    const scenePresenter = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory,
    )(LearningSpaceSceneDefinition);
    const themeConfig = LearningSpaceThemeLookup.getLearningSpaceTheme(
      this.viewModel.theme,
    );

    let insideDeco: AbstractMesh[] = [];
    if (
      themeConfig.insideDecorationModels &&
      themeConfig.insideDecorationModels[
        this.viewModel.learningSpaceTemplateType
      ] !== ""
    )
      insideDeco = await scenePresenter.loadModel(
        themeConfig.insideDecorationModels[
          this.viewModel.learningSpaceTemplateType
        ],
        true,
      );

    let outsideDeco: AbstractMesh[] = [];
    if (
      themeConfig.outsideDecorationModels &&
      themeConfig.outsideDecorationModels[
        this.viewModel.learningSpaceTemplateType
      ] !== ""
    )
      outsideDeco = await scenePresenter.loadModel(
        themeConfig.outsideDecorationModels[
          this.viewModel.learningSpaceTemplateType
        ],
      );

    return { insideDeco, outsideDeco };
  }
}
