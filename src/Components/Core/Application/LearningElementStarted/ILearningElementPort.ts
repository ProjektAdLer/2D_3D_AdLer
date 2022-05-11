import ILearningElementPresenter from "../../Presentation/Babylon/LearningElement/ILearningElementPresenter";
import { LearningElementTO } from "../LoadWorld/ILearningWorldPort";
export default interface ILearningElementPort {
  addLearningElementPresenter(
    learningElementPresenter: ILearningElementPresenter
  ): void;
  presentLearningElement(learningElementStartedTO: LearningElementTO): void;
}
