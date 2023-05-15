import { ISynchronousUsecase } from "../../Abstract/ISynchronousUsecase";
import LearningSpacePrecursorAndSuccessorTO from "../../DataTransferObjects/LearningSpacePrecursorAndSuccessorTO";

export default interface IGetLearningSpacePrecursorAndSuccessorUseCase
  extends ISynchronousUsecase<void, LearningSpacePrecursorAndSuccessorTO> {}
