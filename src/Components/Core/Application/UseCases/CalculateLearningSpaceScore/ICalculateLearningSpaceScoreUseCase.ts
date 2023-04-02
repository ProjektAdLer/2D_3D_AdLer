import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { IInternalSynchronousUsecase } from "../../Abstract/IInternalSynchronousUsecase";
import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";
import LearningSpaceScoreTO from "../../DataTransferObjects/LearningSpaceScoreTO";

export default interface ICalculateLearningSpaceScoreUseCase
  extends ISynchronousUsecase<void, void> {}

export interface IInternalCalculateLearningSpaceScoreUseCase
  extends IInternalSynchronousUsecase<ComponentID, LearningSpaceScoreTO> {}
