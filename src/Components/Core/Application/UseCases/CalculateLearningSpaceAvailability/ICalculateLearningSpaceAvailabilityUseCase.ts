import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import { IInternalSynchronousUsecase } from "../../Abstract/IInternalSynchronousUsecase";

export default interface ICalculateLearningSpaceAvailabilityUseCase
  extends IInternalSynchronousUsecase<ComponentID, boolean> {}
