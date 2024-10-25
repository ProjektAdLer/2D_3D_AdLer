import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";
import { IInternalSynchronousUsecase } from "../../Abstract/IInternalSynchronousUsecase";
import LearningWorldScoreTO from "../../DataTransferObjects/LearningWorldScoreTO";

export default interface ICalculateLearningWorldScoreUseCase
  extends ISynchronousUsecase<void, void> {}

export interface InternalCalculateLearningWorldScoreUseCaseParams {
  worldID: ComponentID;
}

export interface IInternalCalculateLearningWorldScoreUseCase
  extends IInternalSynchronousUsecase<
    InternalCalculateLearningWorldScoreUseCaseParams,
    LearningWorldScoreTO
  > {}
