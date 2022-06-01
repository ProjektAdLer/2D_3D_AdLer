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
  [LearningElementTypeSymbols.h5p]: require("../../../../../Assets/3DLink_H5P.glb"),
  [LearningElementTypeSymbols.text]: require("../../../../../Assets/3DLink_Text.glb"),
  [LearningElementTypeSymbols.image]: require("../../../../../Assets/3DLink_Image.glb"),
  [LearningElementTypeSymbols.video]: require("../../../../../Assets/3DLink_Video.glb"),
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
      CORE_TYPES.IscenePresenter
    );
    this.viewModel = viewModel;
    this.controller = controller;

    // setup callbacks for rerendering when the view model changes
    viewModel.type.subscribe(async () => {
      // this.viewModel.meshes.Value.forEach((mesh) => mesh.dispose());
      await this.loadMeshAsync();
      this.registerAction(ActionManager.OnPickTrigger, this.controller.clicked);
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
    const result = await SceneLoader.ImportMeshAsync(
      "",
      modelLinks[getLearningElementSymbol(this.viewModel.type.Value)],
      "",
      this.scenePresenter.Scene
    );

    this.viewModel.meshes.Value = result.meshes as Mesh[];
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
