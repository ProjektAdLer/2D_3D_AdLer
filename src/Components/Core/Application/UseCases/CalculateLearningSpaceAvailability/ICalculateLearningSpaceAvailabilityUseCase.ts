import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import { IInternalSynchronousUsecase } from "../../Abstract/IInternalSynchronousUsecase";
import LearningSpaceAvailabilityTO from "../../DataTransferObjects/LearningSpaceAvailabilityTO";

export default interface ICalculateLearningSpaceAvailabilityUseCase
  extends IInternalSynchronousUsecase<
    ComponentID,
    LearningSpaceAvailabilityTO
  > {}
