import { injectable } from "inversify";
import ILearningElementPort from "../../../Application/LearningElementStarted/ILearningElementStartedPort";
import { LearningElementTO } from "../../../Application/LoadWorld/ILearningWorldPort";
import ILearningElementPresenter from "../../Babylon/LearningElement/ILearningElementPresenter";

@injectable()
export default class LearningElementPort implements ILearningElementPort {
  private learningElementPresenters: ILearningElementPresenter[] = [];

  addLearningElementPresenter(
    learningElementPresenter: ILearningElementPresenter
  ): void {
    if (this.learningElementPresenters.includes(learningElementPresenter))
      throw new Error("Presenter already added.");

    this.learningElementPresenters.push(learningElementPresenter);
  }
  presentLearningElementStarted(
    learningElementStartedTO: LearningElementTO
  ): void {
    throw new Error("Method not implemented.");
  }
}
