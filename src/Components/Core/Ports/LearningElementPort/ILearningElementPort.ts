import ILearningElementPresenter from "../../Presentation/Babylon/LearningElement/ILearningElementPresenter";
import { LearningElementTO } from "../LearningWorldPort/ILearningWorldPort";
export default interface ILearningElementPort {
  addLearningElementPresenter(
    learningElementPresenter: ILearningElementPresenter
  ): void;
  startLearningElementEditing(
    learningElementStartedTO: LearningElementTO
  ): void;
}
