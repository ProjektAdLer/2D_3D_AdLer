import { injectable } from "inversify";
import ILearningElementPort from "../../Application/LearningElementStarted/ILearningElementPort";
import { LearningElementTO } from "../../Application/LoadWorld/ILearningWorldPort";
import BUILDER_TYPES from "../../DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import ILearningElementPresenter from "../../Presentation/Babylon/LearningElement/ILearningElementPresenter";
import IPresentationBuilder from "../../Presentation/PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../Presentation/PresentationBuilder/IPresentationDirector";
import ILearningElementModalPresenter from "../../Presentation/React/LearningElementModal/ILearningElementModalPresenter";

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
        BUILDER_TYPES.IPresentationDirector
      );
      const builder = CoreDIContainer.get<IPresentationBuilder>(
        BUILDER_TYPES.ILearningElementModalBuilder
      );
      director.build(builder);
      this.modalPresenter = builder.getPresenter();
    }
    this.modalPresenter.presentLearningElementModal(learningElementStartedTO);
  }
}
