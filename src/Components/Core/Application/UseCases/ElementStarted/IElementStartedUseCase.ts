import { ElementID } from "src/Components/Core/Domain/Types/EntityTypes";
import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";

export default interface IElementStartedUseCase
  extends IAsyncUsecase<ElementID, void> {}
