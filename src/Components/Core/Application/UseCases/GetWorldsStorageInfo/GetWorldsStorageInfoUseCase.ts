import { inject, injectable } from "inversify";
import IGetWorldsStorageInfoUseCase from "./IGetWorldsStorageInfoUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type IWorldManagementPort from "../../Ports/Interfaces/IWorldManagementPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import type IWorldStorageAdapter from "../../Ports/WorldStoragePort/IWorldStorageAdapter";
import StorageInfoTO from "../../DataTransferObjects/StorageInfoTO";

@injectable()
export default class GetWorldsStorageInfoUseCase
  implements IGetWorldsStorageInfoUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(PORT_TYPES.IWorldManagementPort)
    private worldManagementPort: IWorldManagementPort,
    @inject(PORT_TYPES.IWorldStorageAdapter)
    private worldStorage: IWorldStorageAdapter,
  ) {}

  async executeAsync(): Promise<void> {
    this.logger.log(
      LogLevelTypes.TRACE,
      "GetWorldsStorageInfoUseCase: Getting storage info",
    );

    try {
      const storageInfo = await this.worldStorage.getStorageInfo();

      const used = storageInfo.used || 0;
      const quota = storageInfo.quota || 0;
      const available = storageInfo.available || 0;

      const usedPercent = quota > 0 ? (used / quota) * 100 : 0;

      const storageInfoTO = new StorageInfoTO(
        used,
        quota,
        available,
        this.formatBytes(used),
        this.formatBytes(quota),
        Math.round(usedPercent * 100) / 100,
      );

      this.logger.log(
        LogLevelTypes.INFO,
        `GetWorldsStorageInfoUseCase: Storage used: ${storageInfoTO.usedFormatted} / ${storageInfoTO.quotaFormatted} (${storageInfoTO.usedPercent}%)`,
      );

      // Notify presentation layer via port
      this.worldManagementPort.onStorageInfoLoaded(storageInfoTO);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unknown error getting storage info";

      this.logger.log(
        LogLevelTypes.ERROR,
        `GetWorldsStorageInfoUseCase: Failed - ${errorMessage}`,
      );

      this.worldManagementPort.onWorldManagementError(errorMessage);
    }
  }

  /**
   * Format bytes to human-readable string
   */
  private formatBytes(bytes: number): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }
}
