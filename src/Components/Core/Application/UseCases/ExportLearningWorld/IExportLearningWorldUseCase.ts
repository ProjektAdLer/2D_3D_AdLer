import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";

export type ExportProgressCallback = (
  current: number,
  total: number,
  status: string,
) => void;

export interface ExportLearningWorldParams {
  worldID: number;
  onProgress?: ExportProgressCallback;
}

export default interface IExportLearningWorldUseCase
  extends IAsyncUsecase<ExportLearningWorldParams, void> {}
