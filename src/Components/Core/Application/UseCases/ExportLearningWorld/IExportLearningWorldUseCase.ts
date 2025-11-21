import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";

export interface ExportLearningWorldParams {
  worldID: number;
}

export default interface IExportLearningWorldUseCase
  extends IAsyncUsecase<ExportLearningWorldParams, void> {}
