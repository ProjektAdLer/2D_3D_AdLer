import { inject, injectable } from "inversify";
import ILearningElementPort from "../../../Application/LearningElementStarted/ILearningElementPort";
import { LearningElementTO } from "../../../Application/LoadWorld/ILearningWorldPort";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import ILearningElementPresenter from "../../Babylon/LearningElement/ILearningElementPresenter";
import IPresentationBuilder from "../../PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";
import ILearningElementModalPresenter from "../../React/LearningElementModal/ILearningElementModalPresenter";

@injectable()
export default class LearningElementPort implements ILearningElementPort {
  private learningElementPresenters: ILearningElementPresenter[] = [];
  private modalPresenter: ILearningElementModalPresenter;

  addLearningElementPresenter(
    learningElementPresenter: ILearningElementPresenter
  ): void {
    if (this.learningElementPresenters.includes(learningElementPresenter))
      throw new Error("Presenter already added.");

    this.learningElementPresenters.push(learningElementPresenter);
  }

  startLearningElementEditing(
    learningElementStartedTO: LearningElementTO
  ): void {
    if (!this.modalPresenter) {
      let director = CoreDIContainer.get<IPresentationDirector>(
        CORE_TYPES.IPresentationDirector
      );
      let builder = CoreDIContainer.get<IPresentationBuilder>(
        CORE_TYPES.ILearningElementModalBuilder
      );
      director.Builder = builder;
      director.build();
      this.modalPresenter = builder.getPresenter();
    }
    this.modalPresenter.presentLearningElementModal(learningElementStartedTO);
  }
}
