import {
  ActionEvent,
  ActionManager,
  Color3,
  ExecuteCodeAction,
  Mesh,
  Tools,
  Vector3,
} from "@babylonjs/core";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import type IScenePresenter from "../SceneManagement/IScenePresenter";
import ILearningElementController from "./ILearningElementController";
import LearningElementViewModel from "./LearningElementViewModel";
import { LearningElementTypes } from "../../../Domain/Types/LearningElementTypes";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import bind from "bind-decorator";

const modelLinks: { [key in LearningElementTypes]?: any } = {
  [LearningElementTypes.h5p]: require("../../../../../Assets/3DModel_LElement_H5P.glb"),
  [LearningElementTypes.text]: require("../../../../../Assets/3DModel_LElement_Text.glb"),
  [LearningElementTypes.pdf]: require("../../../../../Assets/3DModel_LElement_Text.glb"),
  [LearningElementTypes.image]: require("../../../../../Assets/3DModel_LElement_Image.glb"),
  [LearningElementTypes.video]: require("../../../../../Assets/3DModel_LElement_Video.glb"),
};

export default class LearningElementView {
  private scenePresenter: IScenePresenter;

  constructor(
    private viewModel: LearningElementViewModel,
    private controller: ILearningElementController
  ) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);

    // setup callbacks for rerendering when the view model changes
    viewModel.position.subscribe(this.positionModel);
    viewModel.rotation.subscribe(this.positionModel);
    viewModel.hasScored.subscribe(() => {
      this.changeHighlightColor(
        this.viewModel.hasScored.Value ? Color3.Green() : Color3.Red()
      );
    });
  }

  public async setupLearningElement(): Promise<void> {
    // load meshes
    this.viewModel.meshes.Value = (await this.scenePresenter.loadModel(
      modelLinks[this.viewModel.type.Value as LearningElementTypes],
      true
    )) as Mesh[];

    // create action manager for each mesh
    this.viewModel.meshes.Value.forEach((mesh) => {
      mesh.actionManager = new ActionManager(this.scenePresenter.Scene);
    });

    // register interaction callbacks
    this.registerActionWithAllMeshes(
      ActionManager.OnPickTrigger,
      this.controller.clicked
    );
    this.registerActionWithAllMeshes(
      ActionManager.OnPointerOverTrigger,
      this.controller.pointerOver
    );
    this.registerActionWithAllMeshes(
      ActionManager.OnPointerOutTrigger,
      this.controller.pointerOut
    );

    // add meshes to highlight layer
    this.viewModel.meshes.Value.forEach((mesh) => {
      this.scenePresenter.HighlightLayer.addMesh(
        mesh,
        this.viewModel.hasScored.Value ? Color3.Green() : Color3.Red()
      );
    });

    this.positionModel();
  }

  private registerActionWithAllMeshes(
    triggerOptions: any,
    callback: (event?: ActionEvent) => void
  ): void {
    this.viewModel.meshes.Value.forEach((mesh) => {
      mesh.actionManager?.registerAction(
        new ExecuteCodeAction(triggerOptions, callback)
      );
    });
  }

  @bind
  private positionModel(): void {
    if (this.viewModel.meshes.Value) {
      this.viewModel.meshes.Value[0].position = this.viewModel.position.Value;
      this.viewModel.meshes.Value[0].rotate(
        Vector3.Up(),
        Tools.ToRadians(this.viewModel.rotation.Value)
      );
    }
  }

  @bind
  private changeHighlightColor(color: Color3): void {
    this.viewModel.meshes.Value?.forEach((mesh) => {
      this.scenePresenter.HighlightLayer.removeMesh(mesh);
      this.scenePresenter.HighlightLayer.addMesh(mesh, color);
    });
  }
}
