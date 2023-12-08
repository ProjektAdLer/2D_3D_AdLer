import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";
import { IInternalAsyncUsecase } from "../../Abstract/IInternalAsyncUsecase";
import LearningWorldTO from "../../DataTransferObjects/LearningWorldTO";

export default interface ILoadLearningWorldUseCase
  extends IAsyncUsecase<{ worldID: number }, void> {}

export interface IInternalLoadLearningWorldUseCase
  extends IInternalAsyncUsecase<{ worldID: number }, LearningWorldTO> {}
