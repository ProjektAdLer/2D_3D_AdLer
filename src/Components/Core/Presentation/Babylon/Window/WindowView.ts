import Readyable from "../../../../../Lib/Readyable";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import WindowViewModel from "./WindowViewModel";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import bind from "bind-decorator";
import { Mesh, Tools, Vector3 } from "@babylonjs/core";

const windowModelLink = require("../../../../../Assets/3dModels/campusTheme/3DModel_Window.glb");

export default class WindowView extends Readyable {
  private scenePresenter: IScenePresenter;
  constructor(private viewModel: WindowViewModel) {
    super();

    // inject scenePresenter via factory
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
  }

  public async asyncSetup(): Promise<void> {
    await this.loadMeshAsync();
    this.positionWindowMesh();

    this.resolveIsReady();
  }

  private async loadMeshAsync(): Promise<void> {
    const results = await this.scenePresenter.loadModel(windowModelLink);
    // reset quaternion rotation because it can prevent mesh.rotate to have any effect
    results.forEach((mesh) => (mesh.rotationQuaternion = null));

    this.viewModel.meshes = results as Mesh[];
  }
  @bind
  private positionWindowMesh(): void {
    this.viewModel.meshes[0].position = this.viewModel.position;
    this.viewModel.meshes[0].rotation = new Vector3(
      0.0,
      Tools.ToRadians(this.viewModel.rotation) + Math.PI / 2,
      0.0
    );
  }
}
