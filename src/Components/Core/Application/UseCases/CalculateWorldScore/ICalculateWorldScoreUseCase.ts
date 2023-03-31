import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";
import LearningWorldScoreTO from "../../DataTransferObjects/LearningWorldScoreTO";

export default interface ICalculateWorldScoreUseCase
  extends ISynchronousUsecase<void, void> {}
