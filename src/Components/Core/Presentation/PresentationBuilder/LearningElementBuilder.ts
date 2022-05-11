import { inject, injectable } from "inversify";
import ILearningElementPort from "../../Application/LearningElementStarted/ILearningElementPort";
import PORT_TYPES from "../../DependencyInjection/Ports/PORT_TYPES";
import ILearningElementController from "../Babylon/LearningElement/ILearningElementController";
import ILearningElementPresenter from "../Babylon/LearningElement/ILearningElementPresenter";
import ILearningElementView from "../Babylon/LearningElement/ILearningElementView";
import LearningElementController from "../Babylon/LearningElement/LearningElementController";
import LearningElementPresenter from "../Babylon/LearningElement/LearningElementPresenter";
import LearningElementView from "../Babylon/LearningElement/LearningElementView";
import LearningElementViewModel from "../Babylon/LearningElement/LearningElementViewModel";
import IPresentationBuilder from "./IPresentationBuilder";

@injectable()
export default class LearningElementBuilder implements IPresentationBuilder {
  private view: ILearningElementView | null = null;
  private viewModel: LearningElementViewModel | null = null;
  private controller: ILearningElementController | null = null;
  private presenter: ILearningElementPresenter | null = null;

  constructor(
    @inject(PORT_TYPES.ILearningElementPort)
    private learningElemntPort: ILearningElementPort
  ) {}

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
    if (!this.viewModel) {
      throw new Error(
        "ViewModel isn't build yet. Call buildViewModel() first."
      );
    }
    this.controller = new LearningElementController(this.viewModel);
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

    this.learningElemntPort.addLearningElementPresenter(this.presenter);
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
