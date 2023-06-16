import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import StandInDecorationViewModel from "./StandInDecorationViewModel";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import { Mesh, Tools, Vector3 } from "@babylonjs/core";
import bind from "bind-decorator";
import ArrayItemRandomizer from "../../Utils/ArrayItemRandomizer/ArrayItemRandomizer";

const modelLinks = [
  require("../../../../../Assets/3dModels/defaultTheme/d-moebel-komp-1.glb"),
  require("../../../../../Assets/3dModels/defaultTheme/d-moebel-komp-2.glb"),
  require("../../../../../Assets/3dModels/defaultTheme/d-moebel-komp-3.glb"),
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

    // setup callbacks for rerendering when the view model changes
    viewModel.position.subscribe(this.positionModel);
    viewModel.rotation.subscribe(this.positionModel);
  }

  public async setupStandInDecoration(): Promise<void> {
    let modelLink;

    const modelRandomizer = new ArrayItemRandomizer(modelLinks);
    modelLink = modelRandomizer.getItem(
      `${this.viewModel.spaceName.Value} + ${this.viewModel.slotNumber.Value}`
    );
    if (modelLink == null) {
      return;
    }
    this.viewModel.modelMeshes.Value = (await this.scenePresenter.loadModel(
      modelLink,
      true
    )) as Mesh[];

    this.positionModel();
  }

  @bind
  private positionModel(): void {
    if (this.viewModel.modelMeshes.Value) {
      this.viewModel.modelMeshes.Value[0].position =
        this.viewModel.position.Value;

      this.viewModel.modelMeshes.Value[0].rotate(
        Vector3.Up(),
        Tools.ToRadians(this.viewModel.rotation.Value)
      );
    }
  }
}
