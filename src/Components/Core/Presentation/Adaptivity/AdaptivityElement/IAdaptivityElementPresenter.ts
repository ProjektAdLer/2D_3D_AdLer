import AdaptivityElementProgressTO from "src/Components/Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressTO";
import ILearningWorldAdapter from "../../../Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import AdaptivityElementProgressUpdateTO from "../../../Application/DataTransferObjects/AdaptivityElement/AdaptivityElementProgressUpdateTO";
import AdaptivityElementHintTO from "src/Components/Core/Application/DataTransferObjects/AdaptivityElement/AdaptivityElementHintTO";

export default interface IAdaptivityElementPresenter
  extends ILearningWorldAdapter,
    ILearningWorldAdapter {
  onAdaptivityElementLoaded?(
    adaptivityElementProgressTO: AdaptivityElementProgressTO
  ): void;
  onAdaptivityElementAnswerEvaluated?(
    adaptivityElementProgressUpdateTO: AdaptivityElementProgressUpdateTO
  ): void;
  onAdaptivityElementUserHintInformed?(
    adaptivityElementHintTO: AdaptivityElementHintTO
  ): void;
}
