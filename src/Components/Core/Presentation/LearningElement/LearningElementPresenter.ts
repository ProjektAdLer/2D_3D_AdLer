import {
  ActionEvent,
  ActionManager,
  ExecuteCodeAction,
  Mesh,
  SceneLoader,
} from "@babylonjs/core";
import { inject, injectable } from "inversify";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import IRoomController from "../Room/IRoomController";
import type IScenePresenter from "../SceneManagment/IScenePresenter";
import ILearningElementView from "./ILearningElementView";
import ILearningElementPresenter from "./ILearningElementPresenter";
import LearningElementViewModel from "./LearningElementViewModel";

@injectable()
export default class LearningElementPresenter
  implements ILearningElementPresenter
{
  private scenePresenter: IScenePresenter;
  private roomPresenter: IRoomController;
  private view: ILearningElementView;
  private viewModel: LearningElementViewModel;

  constructor(
    @inject(CORE_TYPES.ILearingElementView) view: ILearningElementView,
    @inject(LearningElementViewModel) viewModel: LearningElementViewModel,
    @inject(CORE_TYPES.IScenePresenter) scenePresenter: IScenePresenter,
    @inject(CORE_TYPES.IRoomController) roomPresenter: IRoomController
  ) {
    this.view = view;
    this.viewModel = viewModel;
    view.ViewModel = viewModel;

    this.scenePresenter = scenePresenter;
    this.roomPresenter = roomPresenter;
  }

  async loadMeshAsync(url: string, meshName?: string): Promise<void> {
    const result = await SceneLoader.ImportMeshAsync(
      meshName ? meshName : "",
      url,
      "",
      this.scenePresenter.Scene
    );

    this.viewModel.Meshes = result.meshes as Mesh[];
    this.viewModel.Meshes.forEach((mesh) => {
      mesh.actionManager = new ActionManager(this.scenePresenter.Scene);
    });
  }

  registerAction(
    triggerOptions: any,
    callback: (evt?: ActionEvent) => void
  ): void {
    this.viewModel.Meshes.forEach((mesh) => {
      mesh.actionManager?.registerAction(
        new ExecuteCodeAction(triggerOptions, callback)
      );
    });
  }
}
