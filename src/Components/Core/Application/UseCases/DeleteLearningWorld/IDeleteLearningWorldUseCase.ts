import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";

export interface DeleteLearningWorldParams {
  worldID: number;
}

export default interface IDeleteLearningWorldUseCase
  extends IAsyncUsecase<DeleteLearningWorldParams, void> {}
