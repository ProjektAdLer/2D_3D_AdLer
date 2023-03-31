import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { IInternalSynchronousUsecase } from "../../Abstract/IInternalSynchronousUsecase";
import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";
import LearningSpaceScoreTO from "../../DataTransferObjects/LearningSpaceScoreTO";

export default interface ICalculateSpaceScoreUseCase
  extends ISynchronousUsecase<void, void> {}

export interface IInternalCalculateSpaceScoreUseCase
  extends IInternalSynchronousUsecase<ComponentID, LearningSpaceScoreTO> {}
