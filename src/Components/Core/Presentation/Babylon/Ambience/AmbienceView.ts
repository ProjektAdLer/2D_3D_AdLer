import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import AmbienceViewModel from "./AmbienceViewModel";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import { Mesh, Vector3 } from "@babylonjs/core";
const modelLink = require("../../../../../Assets/brototype/Lernraumumgebung_Prototype.glb");

export default class AmbienceView {
  private scenePresenter: IScenePresenter;
  constructor(private viewModel: AmbienceViewModel) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);

    this.asyncSetup();
  }
  private async asyncSetup(): Promise<void> {
    await this.loadMeshAsync();
  }
  private async loadMeshAsync(): Promise<void> {
    const results = await this.scenePresenter.loadModel(modelLink);

    this.viewModel.meshes.Value = results as Mesh[];
    this.viewModel.meshes.Value.forEach((mesh) => {
      mesh.translate(new Vector3(0, -0.05, 0), 1);
    });
  }
}
