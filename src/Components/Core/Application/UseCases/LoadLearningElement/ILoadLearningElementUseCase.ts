import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";

export default interface ILoadLearningElementUseCase
  extends IAsyncUsecase<ComponentID, void> {}
