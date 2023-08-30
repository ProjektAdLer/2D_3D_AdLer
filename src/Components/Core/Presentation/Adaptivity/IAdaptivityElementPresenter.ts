import {
  AdaptivityContentsTO,
  EvaluationAnswerTO,
} from "../../Application/DataTransferObjects/QuizElementTO";
import LearningElementTO from "../../Application/DataTransferObjects/LearningElementTO";
import ILearningWorldAdapter from "../../Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface IAdaptivityElementPresenter
  extends ILearningWorldAdapter,
    ILearningWorldAdapter {
  onAdaptivityElementLoaded(question: AdaptivityContentsTO): void;
  onAdaptivityElementSubmitted(evaluationTO: EvaluationAnswerTO): void;
}
