import AdaptivityElementProgressTO from "src/Components/Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import { EvaluationAnswerTO } from "../../../Application/DataTransferObjects/QuizElementTO";
import ILearningWorldAdapter from "../../../Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface IAdaptivityElementPresenter
  extends ILearningWorldAdapter,
    ILearningWorldAdapter {
  onAdaptivityElementSubmitted(evaluationTO: EvaluationAnswerTO): void;
  onAdaptivityElementLoaded?(
    adaptivityElementProgressTO: AdaptivityElementProgressTO
  ): void;
}
