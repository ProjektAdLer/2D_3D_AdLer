import { inject, injectable } from "inversify";
import IExportLearningWorldUseCase, {
  ExportLearningWorldParams,
} from "./IExportLearningWorldUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type IWorldManagementPort from "../../Ports/Interfaces/IWorldManagementPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import type IWorldStorageAdapter from "../../Ports/WorldStoragePort/IWorldStorageAdapter";

@injectable()
export default class ExportLearningWorldUseCase
  implements IExportLearningWorldUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(PORT_TYPES.IWorldManagementPort)
    private worldManagementPort: IWorldManagementPort,
    @inject(PORT_TYPES.IWorldStorageAdapter)
    private worldStorage: IWorldStorageAdapter,
  ) {}

  async executeAsync(params: ExportLearningWorldParams): Promise<void> {
    this.logger.log(
      LogLevelTypes.TRACE,
      `ExportLearningWorldUseCase: Exporting world ${params.worldID}`,
    );

    try {
      // Get world metadata
      const metadata = await this.worldStorage.getWorldMetadata(params.worldID);
      if (!metadata) {
        const error = `World ${params.worldID} not found`;
        this.worldManagementPort.onWorldManagementError(error);
        this.logger.log(
          LogLevelTypes.WARN,
          `ExportLearningWorldUseCase: ${error}`,
        );
        return;
      }

      // Get world.json file
      const worldJsonBlob = await this.worldStorage.getFile(
        params.worldID,
        "world.json",
      );
      if (!worldJsonBlob) {
        const error = `world.json not found for world ${params.worldID}`;
        this.worldManagementPort.onWorldManagementError(error);
        this.logger.log(
          LogLevelTypes.ERROR,
          `ExportLearningWorldUseCase: ${error}`,
        );
        return;
      }

      // Parse world.json to get list of element files
      const worldJsonText = await worldJsonBlob.text();
      const worldData = JSON.parse(worldJsonText);

      // Collect all files to export
      const filesToExport: { path: string; blob: Blob }[] = [];
      filesToExport.push({ path: "world.json", blob: worldJsonBlob });

      // Collect element files
      if (worldData.world && worldData.world.elements) {
        for (const element of worldData.world.elements) {
          if (element.url) {
            // Element files are stored with "elements/" prefix
            const elementPath = `elements/${element.url}`;
            const elementBlob = await this.worldStorage.getFile(
              params.worldID,
              elementPath,
            );
            if (elementBlob) {
              filesToExport.push({ path: elementPath, blob: elementBlob });
            } else {
              this.logger.log(
                LogLevelTypes.WARN,
                `ExportLearningWorldUseCase: Element file not found: ${elementPath}`,
              );
            }
          }
        }
      }

      // Create ZIP file using JSZip or similar library
      // For now, we'll create a simple ZIP structure
      // Note: This requires the 'jszip' library to be installed
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      // Add all files to ZIP
      for (const file of filesToExport) {
        zip.file(file.path, file.blob);
      }

      // Generate ZIP blob
      const zipBlob = await zip.generateAsync({ type: "blob" });

      this.logger.log(
        LogLevelTypes.INFO,
        `ExportLearningWorldUseCase: Successfully exported world "${metadata.worldName}" (${filesToExport.length} files)`,
      );

      // Notify presentation layer with the ZIP blob
      this.worldManagementPort.onWorldExported(params.worldID, zipBlob);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unknown error during world export";

      this.logger.log(
        LogLevelTypes.ERROR,
        `ExportLearningWorldUseCase: Export failed - ${errorMessage}`,
      );

      this.worldManagementPort.onWorldManagementError(errorMessage);
    }
  }
}
