import { ElementID } from "../../../Domain/Types/EntityTypes";
import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";
export default interface ICalculateSpaceScoreUseCase
  extends ISynchronousUsecase<{ spaceId: ElementID }> {}
