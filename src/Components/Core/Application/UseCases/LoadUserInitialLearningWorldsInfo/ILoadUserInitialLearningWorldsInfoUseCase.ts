import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";
import { IInternalAsyncUsecase } from "../../Abstract/IInternalAsyncUsecase";
import UserInitialLearningWorldsInfoTO from "../../DataTransferObjects/UserInitialLearningWorldsInfoTO";
export default interface ILoadUserInitialLearningWorldsInfoUseCase
  extends IAsyncUsecase<void, void> {}
export interface IInternalLoadUserInitialLearningWorldsInfoUseCase
  extends IInternalAsyncUsecase<void, UserInitialLearningWorldsInfoTO> {}
