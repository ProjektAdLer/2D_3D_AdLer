import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";

export interface ImportLearningWorldParams {
  file: File;
}

export default interface IImportLearningWorldUseCase
  extends IAsyncUsecase<ImportLearningWorldParams, void> {}
