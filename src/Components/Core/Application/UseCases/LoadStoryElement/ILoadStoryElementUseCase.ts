import { LoadStoryElementType } from "./../../../Domain/Types/LoadStoryElementType";
import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";

export default interface ILoadStoryElementUseCase
  extends IAsyncUsecase<LoadStoryElementType, void> {}
