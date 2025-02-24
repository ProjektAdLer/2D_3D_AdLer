import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import AmbienceViewModel from "./AmbienceViewModel";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import { Mesh, Vector3 } from "@babylonjs/core";
import LearningSpaceThemeLookup from "src/Components/Core/Domain/LearningSpaceThemes/LearningSpaceThemeLookup";

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
      mesh.translate(new Vector3(0, 0, 0), 1);
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
