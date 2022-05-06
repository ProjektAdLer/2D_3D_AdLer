import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import ILearningElementController from "../LearningElement/ILearningElementController";
import ILearningElementPresenter from "../LearningElement/ILearningElementPresenter";
import ILearningElementView from "../LearningElement/ILearningElementView";
import LearningElementController from "../LearningElement/LearningElementController";
import LearningElementPresenter from "../LearningElement/LearningElementPresenter";
import LearningElementView from "../LearningElement/LearningElementView";
import LearningElementViewModel from "../LearningElement/LearningElementViewModel";
import IPresentationBuilder from "./IPresentationBuilder";

export default class LearningElementBuilder implements IPresentationBuilder {
  private view: ILearningElementView | null = null;
  private viewModel: LearningElementViewModel | null = null;
  private controller: ILearningElementController | null = null;
  private presenter: ILearningElementPresenter | null = null;

  reset(): void {
    this.view = null;
    this.viewModel = null;
    this.controller = null;
    this.presenter = null;
  }

  buildViewModel(): void {
    this.viewModel = new LearningElementViewModel();
  }

  buildController(): void {
    this.controller = new LearningElementController();
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

    this.view = new LearningElementView(this.viewModel, this.controller);
  }

  buildPresenter(): void {
    if (!this.viewModel) {
      throw new Error(
        "ViewModel isn't build yet. Call buildViewModel() first."
      );
    }

    this.presenter = new LearningElementPresenter();
    this.presenter.ViewModel = this.viewModel;
  }

  getPresenter(): ILearningElementPresenter {
    if (!this.presenter) {
      throw new Error(
        "Presenter isn't build yet. Call buildPresenter() first."
      );
    }
    return this.presenter;
  }

  getController(): ILearningElementController {
    if (!this.controller) {
      throw new Error(
        "Controller isn't build yet. Call buildController() first."
      );
    }
    return this.controller;
  }

  getViewModel(): LearningElementViewModel {
    if (!this.viewModel) {
      throw new Error(
        "ViewModel isn't build yet. Call buildViewModel() first."
      );
    }
    return this.viewModel;
  }
}
