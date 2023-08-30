import { SubmittedAnswersTO } from "../../../DataTransferObjects/QuizElementTO";
import { IAsyncUsecase } from "../../../Abstract/IAsyncUsecase";

export default interface ISubmitAdaptivityElementSelectionUseCase
  extends IAsyncUsecase<SubmittedAnswersTO, void> {}
