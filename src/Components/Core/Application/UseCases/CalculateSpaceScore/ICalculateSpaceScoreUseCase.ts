import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";
import SpaceScoreTO from "../../DataTransferObjects/SpaceScoreTO";

export default interface ICalculateSpaceScoreUseCase
  extends ISynchronousUsecase<ComponentID, SpaceScoreTO> {}
