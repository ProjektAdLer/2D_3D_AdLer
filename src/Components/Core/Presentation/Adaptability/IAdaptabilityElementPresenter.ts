import LearningElementTO from "../../Application/DataTransferObjects/LearningElementTO";
import QuizElementTO from "../../Application/DataTransferObjects/QuizElementTO";
import ILearningWorldAdapter from "../../Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface IAdaptabilityElementPresenter
  extends ILearningWorldAdapter,
    ILearningWorldAdapter {
  onLearningElementLoaded(elementTO: LearningElementTO): void;
  onAdaptabilityElementLoaded(question: QuizElementTO): void;
}
