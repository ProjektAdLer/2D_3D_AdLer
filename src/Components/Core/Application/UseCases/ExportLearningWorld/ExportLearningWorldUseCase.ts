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
      params.onProgress?.(0, 100, "Lade Weltdaten...");
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

      // Get all files for this world from storage
      params.onProgress?.(10, 100, "Sammle Dateien...");
      const allFiles = await this.worldStorage.getAllFiles(params.worldID);

      if (allFiles.length === 0) {
        const error = `No files found for world ${params.worldID}`;
        this.worldManagementPort.onWorldManagementError(error);
        this.logger.log(
          LogLevelTypes.ERROR,
          `ExportLearningWorldUseCase: ${error}`,
        );
        return;
      }

      // Verify that world.json exists
      const hasWorldJson = allFiles.some((file) => file.path === "world.json");
      if (!hasWorldJson) {
        const error = `world.json not found for world ${params.worldID}`;
        this.worldManagementPort.onWorldManagementError(error);
        this.logger.log(
          LogLevelTypes.ERROR,
          `ExportLearningWorldUseCase: ${error}`,
        );
        return;
      }

      // Create ZIP file using JSZip
      params.onProgress?.(20, 100, "Erstelle ZIP-Archiv...");
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      // Add all files to ZIP with progress tracking
      const totalFiles = allFiles.length;
      for (let i = 0; i < totalFiles; i++) {
        const file = allFiles[i];

        // Calculate progress: 20% setup, 60% for adding files, 20% for generating
        const progress = 20 + Math.round((i / totalFiles) * 60);
        params.onProgress?.(
          progress,
          100,
          `Füge Datei hinzu ${i + 1}/${totalFiles}: ${file.path}`,
        );

        zip.file(file.path, file.blob);
      }

      // Generate ZIP blob
      params.onProgress?.(80, 100, "Komprimiere ZIP-Datei...");
      const zipBlob = await zip.generateAsync({ type: "blob" }, (metadata) => {
        // JSZip provides compression progress
        const compressionProgress = 80 + Math.round(metadata.percent * 0.15);
        params.onProgress?.(
          compressionProgress,
          100,
          `Komprimiere... ${Math.round(metadata.percent)}%`,
        );
      });

      params.onProgress?.(100, 100, "Export abgeschlossen!");

      this.logger.log(
        LogLevelTypes.INFO,
        `ExportLearningWorldUseCase: Successfully exported world "${metadata.worldName}" (${allFiles.length} files)`,
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
