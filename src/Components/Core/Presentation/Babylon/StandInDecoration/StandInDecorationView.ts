import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import StandInDecorationViewModel from "./StandInDecorationViewModel";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import { Mesh, Tools, Vector3 } from "@babylonjs/core";
import ArrayItemRandomizer from "../../Utils/ArrayItemRandomizer/ArrayItemRandomizer";

const modelLinks = [
  require("../../../../../Assets/3dModels/campusTheme/d-moebel-komp-1.glb"),
  require("../../../../../Assets/3dModels/campusTheme/d-moebel-komp-2.glb"),
  require("../../../../../Assets/3dModels/campusTheme/d-moebel-komp-3.glb"),
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

export default class StandInDecorationView {
  private scenePresenter: IScenePresenter;

  constructor(private viewModel: StandInDecorationViewModel) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
  }

  public async asyncSetup(): Promise<void> {
    let modelLink;

    const modelRandomizer = new ArrayItemRandomizer(modelLinks);
    modelLink = modelRandomizer.getItem(
      `${this.viewModel.slotNumber} ${this.viewModel.spaceName}`
    );
    if (modelLink == null) {
      return;
    }
    this.viewModel.modelMeshes = (await this.scenePresenter.loadModel(
      modelLink,
      true
    )) as Mesh[];

    this.viewModel.modelMeshes[0].position = this.viewModel.position;

    this.viewModel.modelMeshes[0].rotate(
      Vector3.Up(),
      Tools.ToRadians(this.viewModel.rotation)
    );
  }
}
