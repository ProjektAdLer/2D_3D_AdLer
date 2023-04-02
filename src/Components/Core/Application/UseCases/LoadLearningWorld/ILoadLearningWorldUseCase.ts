import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";

export default interface ILoadLearningWorldUseCase
  extends IAsyncUsecase<{ worldID: number }, void> {}
