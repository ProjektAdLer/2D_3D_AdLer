import { injectable } from "inversify";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../DependencyInjection/Ports/PORT_TYPES";
import ILearningRoomController from "../Babylon/LearningRoom/ILearningRoomController";
import ILearningRoomPort from "../Babylon/LearningRoom/ILearningRoomPort";
import LearningRoomController from "../Babylon/LearningRoom/LearningRoomController";
import LearningRoomPresenter from "../Babylon/LearningRoom/LearningRoomPresenter";
import LearningRoomView from "../Babylon/LearningRoom/LearningRoomView";
import LearningRoomViewModel from "../Babylon/LearningRoom/LearningRoomViewModel";
import SceneController from "../Babylon/SceneManagment/SceneController";
import IPresentationBuilder from "./IPresentationBuilder";

@injectable()
export default class LearningRoomBuilder implements IPresentationBuilder {
  private view: LearningRoomView | null = null;
  private viewModel: LearningRoomViewModel | null = null;
  private presenter: ILearningRoomPort | null = null;
  private controller: ILearningRoomController | null = null;

  reset(): void {
    this.view = null;
    this.viewModel = null;
    this.presenter = null;
    this.controller = null;
  }

  buildViewModel(): void {
    this.viewModel = new LearningRoomViewModel();
    this.viewModel.scene.Value = CoreDIContainer.get<SceneController>(
      CORE_TYPES.ISceneController
    ).Scene;
  }

  buildController(): void {
    this.controller = new LearningRoomController();
  }

  buildView(): void {
    if (!this.viewModel) {
      throw new Error(
        "ViewModel isn't build yet. Call buildViewModel() first."
      );
    }
    if (!this.controller) {
      throw new Error(
        "Controller isn't build yet. Call buildController() first."
      );
    }

    this.view = new LearningRoomView(this.viewModel, this.controller);
  }

  buildPresenter(): void {
    if (!this.viewModel) {
      throw new Error(
        "ViewModel isn't build yet. Call buildViewModel() first."
      );
    }

    this.presenter = CoreDIContainer.get<ILearningRoomPort>(
      PORT_TYPES.ILearningRoomPort
    );
    (this.presenter as LearningRoomPresenter).ViewModel = this.viewModel;
  }

  getPresenter(): ILearningRoomPort {
    if (!this.presenter) {
      throw new Error(
        "Presenter isn't build yet. Call buildPresenter() first."
      );
    }
    return this.presenter;
  }

  getController(): ILearningRoomController {
    if (!this.controller) {
      throw new Error(
        "Controller isn't build yet. Call buildController() first."
      );
    }
    return this.controller;
  }

  getViewModel(): LearningRoomViewModel {
    if (!this.viewModel) {
      throw new Error(
        "ViewModel isn't build yet. Call buildViewModel() first."
      );
    }
    return this.viewModel;
  }
}
