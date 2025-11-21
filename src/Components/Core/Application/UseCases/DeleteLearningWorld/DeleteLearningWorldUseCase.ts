import { inject, injectable } from "inversify";
import IDeleteLearningWorldUseCase, {
  DeleteLearningWorldParams,
} from "./IDeleteLearningWorldUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type IWorldManagementPort from "../../Ports/Interfaces/IWorldManagementPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import type IWorldStorageAdapter from "../../Ports/WorldStoragePort/IWorldStorageAdapter";
import type ILoadUserLearningWorldsInfoUseCase from "../LoadUserLearningWorldsInfo/ILoadUserLearningWorldsInfoUseCase";

@injectable()
export default class DeleteLearningWorldUseCase
  implements IDeleteLearningWorldUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(PORT_TYPES.IWorldManagementPort)
    private worldManagementPort: IWorldManagementPort,
    @inject(PORT_TYPES.IWorldStorageAdapter)
    private worldStorage: IWorldStorageAdapter,
    @inject(USECASE_TYPES.ILoadUserLearningWorldsInfoUseCase)
    private loadUserWorldsInfoUseCase: ILoadUserLearningWorldsInfoUseCase,
  ) {}

  async executeAsync(params: DeleteLearningWorldParams): Promise<void> {
    this.logger.log(
      LogLevelTypes.TRACE,
      `DeleteLearningWorldUseCase: Deleting world ${params.worldID}`,
    );

    try {
      // Check if world exists
      const exists = await this.worldStorage.worldExists(params.worldID);
      if (!exists) {
        const error = `World ${params.worldID} not found`;
        this.worldManagementPort.onWorldManagementError(error);
        this.logger.log(
          LogLevelTypes.WARN,
          `DeleteLearningWorldUseCase: ${error}`,
        );
        return;
      }

      // Delete world from storage
      await this.worldStorage.deleteWorld(params.worldID);

      this.logger.log(
        LogLevelTypes.INFO,
        `DeleteLearningWorldUseCase: Successfully deleted world ${params.worldID}`,
      );

      // Notify presentation layer via port
      this.worldManagementPort.onWorldDeleted(params.worldID);

      // Reload user worlds info to update entities
      this.logger.log(
        LogLevelTypes.TRACE,
        "DeleteLearningWorldUseCase: Reloading user worlds info to update entities",
      );
      await this.loadUserWorldsInfoUseCase.executeAsync();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unknown error during world deletion";

      this.logger.log(
        LogLevelTypes.ERROR,
        `DeleteLearningWorldUseCase: Deletion failed - ${errorMessage}`,
      );

      this.worldManagementPort.onWorldManagementError(errorMessage);
    }
  }
}
