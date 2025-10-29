import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import AmbienceViewModel from "./AmbienceViewModel";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import { Mesh, Vector3 } from "@babylonjs/core";
import LearningSpaceThemeLookup from "src/Components/Core/Domain/LearningSpaceThemes/LearningSpaceThemeLookup";
import { ThemeType } from "src/Components/Core/Domain/Types/ThemeTypes";

export default class AmbienceView {
  private scenePresenter: IScenePresenter;

  constructor(private viewModel: AmbienceViewModel) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory,
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
  }

  public async asyncSetup(): Promise<void> {
    const results = await this.scenePresenter.loadModel(
      this.getModelLinkByTheme(),
    );

    this.viewModel.meshes.Value = results as Mesh[];
    this.viewModel.meshes.Value.forEach((mesh) => {
      if (
        this.viewModel.theme === ThemeType.Campus ||
        this.viewModel.theme === ThemeType.CampusAB ||
        this.viewModel.theme === ThemeType.CampusKE ||
        this.viewModel.theme === ThemeType.Arcade ||
        this.viewModel.theme === ThemeType.Suburb ||
        this.viewModel.theme === ThemeType.CampusStudentClub ||
        this.viewModel.theme === ThemeType.CampusAB_Presentation ||
        this.viewModel.theme === ThemeType.CampusAB_SocialArea ||
        this.viewModel.theme === ThemeType.CampusAB_FnE ||
        this.viewModel.theme === ThemeType.CampusAB_TechnicalArea
      ) {
        mesh.translate(new Vector3(0, -0.05, 0), 1);
      }
      mesh.alwaysSelectAsActiveMesh = true; //Fixes Background Animations being Culled, but may cause Performance Issues, Fix with Changing Camera Rotation Frustum
      mesh.isPickable = false;
    });
  }

  private getModelLinkByTheme(): string {
    const themeConfig = LearningSpaceThemeLookup.getLearningSpaceTheme(
      this.viewModel.theme,
    );
    return themeConfig.ambienceModel;
  }
}
