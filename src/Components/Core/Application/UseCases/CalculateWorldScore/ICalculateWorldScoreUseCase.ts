import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";
import WorldScoreTO from "../../DataTransferObjects/WorldScoreTO";

export default interface ICalculateWorldScoreUseCase
  extends ISynchronousUsecase<void, void> {}
