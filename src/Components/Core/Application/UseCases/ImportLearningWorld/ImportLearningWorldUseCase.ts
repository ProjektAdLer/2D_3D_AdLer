import { inject, injectable } from "inversify";
import IImportLearningWorldUseCase, {
  ImportLearningWorldParams,
} from "./IImportLearningWorldUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type IWorldManagementPort from "../../Ports/Interfaces/IWorldManagementPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import type IMBZParserAdapter from "../../Ports/MBZParserPort/IMBZParserAdapter";
import type IWorldStorageAdapter from "../../Ports/WorldStoragePort/IWorldStorageAdapter";
import type ILoadUserLearningWorldsInfoUseCase from "../LoadUserLearningWorldsInfo/ILoadUserLearningWorldsInfoUseCase";
import WorldImportResultTO from "../../DataTransferObjects/WorldImportResultTO";

@injectable()
export default class ImportLearningWorldUseCase
  implements IImportLearningWorldUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(PORT_TYPES.IWorldManagementPort)
    private worldManagementPort: IWorldManagementPort,
    @inject(PORT_TYPES.IMBZParserAdapter)
    private mbzParser: IMBZParserAdapter,
    @inject(PORT_TYPES.IWorldStorageAdapter)
    private worldStorage: IWorldStorageAdapter,
    @inject(USECASE_TYPES.ILoadUserLearningWorldsInfoUseCase)
    private loadUserWorldsInfoUseCase: ILoadUserLearningWorldsInfoUseCase,
  ) {}

  async executeAsync(params: ImportLearningWorldParams): Promise<void> {
    this.logger.log(
      LogLevelTypes.TRACE,
      `ImportLearningWorldUseCase: Starting import of ${params.file.name}`,
    );

    try {
      // Validate MBZ file
      const isValid = await this.mbzParser.validateMBZ(params.file);
      if (!isValid) {
        const error = "Invalid MBZ file format";
        this.worldManagementPort.onWorldManagementError(error);
        this.logger.log(
          LogLevelTypes.ERROR,
          `ImportLearningWorldUseCase: ${error}`,
        );
        return;
      }

      // Check storage space
      const hasSpace = await this.worldStorage.hasEnoughSpace(params.file.size);

      if (!hasSpace) {
        const error = `Insufficient storage space. File size: ${(params.file.size / 1024 / 1024).toFixed(2)}MB`;
        this.worldManagementPort.onWorldManagementError(error);
        this.logger.log(
          LogLevelTypes.ERROR,
          `ImportLearningWorldUseCase: ${error}`,
        );
        return;
      }

      // Parse MBZ file (this also stores it in LocalStore)
      const parsedData = await this.mbzParser.parseMBZ(
        params.file,
        params.onProgress,
      );

      this.logger.log(
        LogLevelTypes.INFO,
        `ImportLearningWorldUseCase: Successfully imported world "${parsedData.worldName}" (ID: ${parsedData.worldID})`,
      );

      // Notify presentation layer via port
      const result = new WorldImportResultTO(
        true,
        parsedData.worldID,
        parsedData.worldName,
        parsedData.elementCount,
        parsedData.sizeInBytes,
        [],
        parsedData.warnings,
      );

      this.worldManagementPort.onWorldImported(result);

      // Reload user worlds info to update entities
      this.logger.log(
        LogLevelTypes.TRACE,
        "ImportLearningWorldUseCase: Reloading user worlds info to update entities",
      );
      await this.loadUserWorldsInfoUseCase.executeAsync();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error during import";

      this.logger.log(
        LogLevelTypes.ERROR,
        `ImportLearningWorldUseCase: Import failed - ${errorMessage}`,
      );

      this.worldManagementPort.onWorldManagementError(errorMessage);

      // Still notify with failure result
      const result = new WorldImportResultTO(
        false,
        -1,
        "",
        0,
        0,
        [errorMessage],
        [],
      );
      this.worldManagementPort.onWorldImported(result);
    }
  }
}
