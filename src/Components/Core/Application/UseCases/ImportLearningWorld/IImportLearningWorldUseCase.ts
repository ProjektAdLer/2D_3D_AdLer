import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";
import type { ProgressCallback } from "../../Ports/MBZParserPort/IMBZParserAdapter";

export interface ImportLearningWorldParams {
  file: File;
  onProgress?: ProgressCallback;
}

export default interface IImportLearningWorldUseCase
  extends IAsyncUsecase<ImportLearningWorldParams, void> {}
