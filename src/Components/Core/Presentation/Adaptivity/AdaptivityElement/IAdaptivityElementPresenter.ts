import AdaptivityElementProgressTO from "src/Components/Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import ILearningWorldAdapter from "../../../Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import AdaptivityElementProgressUpdateTO from "../../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressUpdateTO";

export default interface IAdaptivityElementPresenter
  extends ILearningWorldAdapter,
    ILearningWorldAdapter {
  onAdaptivityElementLoaded?(
    adaptivityElementProgressTO: AdaptivityElementProgressTO
  ): void;
  onAdaptivityElementAnswerEvaluated?(
    adaptivityElementProgressUpdateTO: AdaptivityElementProgressUpdateTO
  ): void;
}
