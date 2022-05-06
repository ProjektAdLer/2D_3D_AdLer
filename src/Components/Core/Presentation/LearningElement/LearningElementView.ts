import {
  ActionEvent,
  ActionManager,
  ExecuteCodeAction,
  Mesh,
  SceneLoader,
} from "@babylonjs/core";
import { inject, injectable } from "inversify";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import type ISceneController from "../SceneManagment/ISceneController";
import ILearningElementController from "./ILearningElementController";
import ILearningElementView from "./ILearningElementView";
import LearningElementViewModel from "./LearningElementViewModel";
import { LearningElementTypeSymbols } from "./Types/LearningElementTypes";

const modelLinks = {
  [LearningElementTypeSymbols.h5p]: require("../../../../Assets/3DLink_H5P.glb"),
  [LearningElementTypeSymbols.text]: require("../../../../Assets/3DLink_Text.glb"),
  [LearningElementTypeSymbols.image]: require("../../../../Assets/3DLink_Image.glb"),
  [LearningElementTypeSymbols.video]: require("../../../../Assets/3DLink_Video.glb"),
};

@injectable()
export default class LearningElementView implements ILearningElementView {
  private viewModel: LearningElementViewModel;
  private controller: ILearningElementController;

  set ViewModel(newViewModel: LearningElementViewModel) {
    this.viewModel = newViewModel;
  }

  set Controller(newController: ILearningElementController) {
    this.controller = newController;
  }

  constructor(
    @inject(CORE_TYPES.ISceneController)
    private sceneController: ISceneController
  ) {}

  async loadMeshAsync(url: string, meshName?: string): Promise<void> {
    const result = await SceneLoader.ImportMeshAsync(
      meshName ? meshName : "",
      url,
      "",
      this.sceneController.Scene
    );

    this.viewModel.Meshes = result.meshes as Mesh[];
    this.viewModel.Meshes.forEach((mesh) => {
      mesh.actionManager = new ActionManager(this.sceneController.Scene);
    });
  }

  registerAction(
    triggerOptions: any,
    callback: (event?: ActionEvent) => void
  ): void {
    this.viewModel.Meshes.forEach((mesh) => {
      mesh.actionManager?.registerAction(
        new ExecuteCodeAction(triggerOptions, callback)
      );
    });
  }
}
