import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { IInternalSynchronousUsecase } from "../../Abstract/IInternalSynchronousUsecase";
import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";
import SpaceScoreTO from "../../DataTransferObjects/SpaceScoreTO";

export default interface ICalculateSpaceScoreUseCase
  extends ISynchronousUsecase<void, void> {}

export interface IInternalCalculateSpaceScoreUseCase
  extends IInternalSynchronousUsecase<ComponentID, SpaceScoreTO> {}
