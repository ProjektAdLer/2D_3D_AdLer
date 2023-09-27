import { IAsyncUsecase } from "../../../Abstract/IAsyncUsecase";
import AdaptivityElementQuestionSubmissionTO from "../../../DataTransferObjects/AdaptivityElement/AdaptivityElementQuestionSubmissionTO";

export default interface ISubmitAdaptivityElementSelectionUseCase
  extends IAsyncUsecase<AdaptivityElementQuestionSubmissionTO, void> {}
