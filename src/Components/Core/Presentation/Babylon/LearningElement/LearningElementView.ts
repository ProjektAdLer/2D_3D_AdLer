import {
  ActionEvent,
  ActionManager,
  ExecuteCodeAction,
  Mesh,
  SceneLoader,
  Tools,
  Vector3,
} from "@babylonjs/core";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import type IScenePresenter from "../SceneManagement/IScenePresenter";
import ILearningElementController from "./ILearningElementController";
import ILearningElementView from "./ILearningElementView";
import LearningElementViewModel from "./LearningElementViewModel";
import {
  getLearningElementSymbol,
  LearningElementTypeSymbols,
} from "./Types/LearningElementTypes";

const modelLinks = {
  [LearningElementTypeSymbols.h5p]: require("../../../../../Assets/3DModel_LElement_H5P.glb"),
  [LearningElementTypeSymbols.text]: require("../../../../../Assets/3DModel_LElement_Text.glb"),
  [LearningElementTypeSymbols.image]: require("../../../../../Assets/3DModel_LElement_Image.glb"),
  [LearningElementTypeSymbols.video]: require("../../../../../Assets/3DModel_LElement_Video.glb"),
};

export default class LearningElementView implements ILearningElementView {
  private viewModel: LearningElementViewModel;
  private controller: ILearningElementController;
  private scenePresenter: IScenePresenter;

  constructor(
    viewModel: LearningElementViewModel,
    controller: ILearningElementController
  ) {
    this.scenePresenter = CoreDIContainer.get<IScenePresenter>(
      CORE_TYPES.IScenePresenter
    );
    this.viewModel = viewModel;
    this.controller = controller;

    // setup callbacks for rerendering when the view model changes
    viewModel.learningElementData.subscribe(async () => {
      // this.viewModel.meshes.Value.forEach((mesh) => mesh.dispose());
      await this.loadMeshAsync();
      this.registerAction(ActionManager.OnPickTrigger, this.controller.clicked);
      this.registerAction(
        ActionManager.OnPointerOverTrigger,
        this.controller.pointerOver
      );
      this.registerAction(
        ActionManager.OnPointerOutTrigger,
        this.controller.pointerOut
      );
      this.positionMesh();
    });
    viewModel.position.subscribe(() => {
      this.positionMesh();
    });
    viewModel.rotation.subscribe(() => {
      this.positionMesh();
    });
  }

  private async loadMeshAsync(): Promise<void> {
    this.viewModel.meshes.Value = (await this.scenePresenter.loadModel(
      modelLinks[
        getLearningElementSymbol(this.viewModel.learningElementData.Value.type)
      ],
      true
    )) as Mesh[];

    this.viewModel.meshes.Value.forEach((mesh) => {
      mesh.actionManager = new ActionManager(this.scenePresenter.Scene);
    });
  }

  private positionMesh(): void {
    if (this.viewModel.meshes.Value) {
      this.viewModel.meshes.Value[0].position = this.viewModel.position.Value;
      this.viewModel.meshes.Value[0].rotate(
        Vector3.Up(),
        Tools.ToRadians(this.viewModel.rotation.Value)
      );
    }
  }

  private registerAction(
    triggerOptions: any,
    callback: (event?: ActionEvent) => void
  ): void {
    this.viewModel.meshes.Value.forEach((mesh) => {
      mesh.actionManager?.registerAction(
        new ExecuteCodeAction(triggerOptions, callback)
      );
    });
  }
}
