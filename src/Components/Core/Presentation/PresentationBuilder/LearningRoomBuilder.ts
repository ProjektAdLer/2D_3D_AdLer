import { injectable } from "inversify";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import ILearningRoomController from "../LearningRoom/ILearningRoomController";
import ILearningRoomPort from "../LearningRoom/ILearningRoomPort";
import LearningRoomPresenter from "../LearningRoom/LearningRoomPresenter";
import LearningRoomView from "../LearningRoom/LearningRoomView";
import LearningRoomViewModel from "../LearningRoom/LearningRoomViewModel";
import SceneController from "../SceneManagment/SceneController";
import IPresentationBuilder from "./IPresentationBuilder";

@injectable()
export default class LearningRoomBuilder implements IPresentationBuilder {
  private view: LearningRoomView;
  private viewModel: LearningRoomViewModel;
  private presenter: ILearningRoomPort;
  private controller: ILearningRoomController;

  reset(): void {}

  buildViewModel(): void {
    this.viewModel = CoreDIContainer.get(LearningRoomViewModel);
    this.viewModel.scene.Value = CoreDIContainer.get<SceneController>(
      CORE_TYPES.ISceneController
    ).Scene;
  }

  buildController(): void {
    this.controller = CoreDIContainer.get<ILearningRoomController>(
      CORE_TYPES.ILearningRoomController
    );
  }

  buildView(): void {
    this.view = CoreDIContainer.get<LearningRoomView>(
      CORE_TYPES.ILearningRoomView
    );
    this.view.ViewModel = this.viewModel;
    this.view.Controller = this.controller;
  }

  buildPresenter(): void {
    this.presenter = CoreDIContainer.get<ILearningRoomPort>(
      CORE_TYPES.ILearningRoomPort
    );
    (this.presenter as LearningRoomPresenter).ViewModel = this.viewModel;
  }

  getPresenter(): ILearningRoomPort {
    return this.presenter;
  }

  getController(): ILearningRoomController {
    return this.controller;
  }

  getViewModel(): LearningRoomViewModel {
    return this.viewModel;
  }
}
