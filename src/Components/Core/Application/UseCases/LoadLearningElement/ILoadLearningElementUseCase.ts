import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";

export default interface ILoadLearningElementUseCase
  extends IAsyncUsecase<
    { elementID: ComponentID; isScoreable: boolean },
    void
  > {}
