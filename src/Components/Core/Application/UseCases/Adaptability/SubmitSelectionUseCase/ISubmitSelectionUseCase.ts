import { SubmittedAnswersTO } from "./../../../DataTransferObjects/QuizElementTO";
import { IAsyncUsecase } from "../../../Abstract/IAsyncUsecase";

export default interface ISubmitSelectionUseCase
  extends IAsyncUsecase<SubmittedAnswersTO, void> {}
