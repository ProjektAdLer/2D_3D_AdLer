import { injectable } from "inversify";
import ILearningElementPort from "./ILearningElementPort";
import BUILDER_TYPES from "../../DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import ILearningElementPresenter from "../../Presentation/Babylon/LearningElement/ILearningElementPresenter";
import IPresentationBuilder from "../../Presentation/PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../Presentation/PresentationBuilder/IPresentationDirector";
import ILearningElementModalPresenter from "../../Presentation/React/LearningElementModal/ILearningElementModalPresenter";
import { logger } from "src/Lib/Logger";
import LearningElementTO from "../../Application/DataTransportObjects/LearningElementTO";

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
      throw new Error("LearningElementModalPresenter is not registered.");
    }
    this.modalPresenter.presentLearningElementModal(learningElementStartedTO);
  }

  registerModalPresenter(modalPresenter: ILearningElementModalPresenter): void {
    if (this.modalPresenter)
      logger.warn("LearningElementModalPresenter is already registered.");
    this.modalPresenter = modalPresenter;
  }
}
