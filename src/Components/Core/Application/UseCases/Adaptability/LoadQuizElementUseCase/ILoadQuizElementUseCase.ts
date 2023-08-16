import { IAsyncUsecase } from "../../../Abstract/IAsyncUsecase";

export default interface ILoadQuizElementUseCase
  extends IAsyncUsecase<string, void> {}
