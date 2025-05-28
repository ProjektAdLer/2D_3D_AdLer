import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import { IInternalSynchronousUsecase } from "../../Abstract/IInternalSynchronousUsecase";

export default interface ICalculateInitialExperiencePointsUseCase
  extends IInternalSynchronousUsecase<ComponentID, void> {}
