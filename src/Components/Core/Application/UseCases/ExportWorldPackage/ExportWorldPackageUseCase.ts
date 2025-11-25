import { inject, injectable } from "inversify";
import IExportWorldPackageUseCase, {
  ExportWorldPackageParams,
  ExportWorldPackageResult,
} from "./IExportWorldPackageUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type IWorldManagementPort from "../../Ports/Interfaces/IWorldManagementPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import type IWorldStorageAdapter from "../../Ports/WorldStoragePort/IWorldStorageAdapter";

/**
 * WorldsIndex structure for the generated worlds.json
 */
interface WorldsIndexEntry {
  worldID: number;
  worldName: string;
  worldFolder: string;
  description?: string;
  elementCount?: number;
}

/**
 * Internal structure to track world data during export
 */
interface WorldExportData {
  originalWorldID: number;
  newWorldID: number;
  worldName: string;
  worldFolder: string;
  source: "indexeddb" | "public";
  files: Array<{ path: string; blob: Blob }>;
  elementCount?: number;
  description?: string;
}

/**
 * ExportWorldPackageUseCase
 *
 * Exports multiple learning worlds as a deployable LearningWorlds.zip package.
 *
 * Features:
 * - Loads worlds from IndexedDB (user-imported) and public folder (pre-installed)
 * - Reassigns world IDs sequentially to avoid conflicts
 * - Updates world.json files with new IDs
 * - Generates a worlds.json index file
 * - Creates a ZIP file ready for web server deployment
 */
@injectable()
export default class ExportWorldPackageUseCase
  implements IExportWorldPackageUseCase
{
  private baseUrl: string;

  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(PORT_TYPES.IWorldManagementPort)
    private worldManagementPort: IWorldManagementPort,
    @inject(PORT_TYPES.IWorldStorageAdapter)
    private worldStorage: IWorldStorageAdapter,
  ) {
    const publicUrl = process.env.PUBLIC_URL || "";
    this.baseUrl = window.location.origin + publicUrl + "/LearningWorlds/";
  }

  async executeAsync(
    params: ExportWorldPackageParams,
  ): Promise<ExportWorldPackageResult> {
    this.logger.log(
      LogLevelTypes.TRACE,
      `ExportWorldPackageUseCase: Exporting ${params.worldIDs.length} worlds as package`,
    );

    params.onProgress?.(0, 100, "Initialisiere Export...");

    try {
      // Validate input
      if (!params.worldIDs || params.worldIDs.length === 0) {
        throw new Error("No worlds selected for export");
      }

      // Step 1: Load all world data (10-50%)
      params.onProgress?.(5, 100, "Lade Weltdaten...");
      const worldsData = await this.loadAllWorldsData(
        params.worldIDs,
        (progress, status) => {
          params.onProgress?.(5 + progress * 0.45, 100, status);
        },
      );

      // Step 2: Reassign world IDs sequentially (50-55%)
      params.onProgress?.(50, 100, "Vergebe neue World-IDs...");
      const reassignedWorlds = this.reassignWorldIDs(worldsData);

      // Step 3: Generate worlds.json (55-60%)
      params.onProgress?.(55, 100, "Generiere worlds.json...");
      const worldsIndex = this.generateWorldsIndex(reassignedWorlds);

      // Step 4: Create ZIP file (60-95%)
      params.onProgress?.(60, 100, "Erstelle ZIP-Archiv...");
      const zipBlob = await this.createZipPackage(
        reassignedWorlds,
        worldsIndex,
        (progress, status) => {
          params.onProgress?.(60 + progress * 0.35, 100, status);
        },
      );

      // Step 5: Complete
      params.onProgress?.(100, 100, "Export abgeschlossen!");

      const result: ExportWorldPackageResult = {
        zipBlob,
        fileName: "LearningWorlds.zip",
        worldCount: reassignedWorlds.length,
        totalSize: zipBlob.size,
      };

      this.logger.log(
        LogLevelTypes.INFO,
        `ExportWorldPackageUseCase: Successfully exported ${result.worldCount} worlds (${this.formatBytes(result.totalSize)})`,
      );

      // Notify presentation layer
      this.worldManagementPort.onWorldPackageExported(result.zipBlob);

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unknown error during package export";

      this.logger.log(
        LogLevelTypes.ERROR,
        `ExportWorldPackageUseCase: Export failed - ${errorMessage}`,
      );

      this.worldManagementPort.onWorldManagementError(errorMessage);
      throw error;
    }
  }

  /**
   * Load all world data from IndexedDB and public folder
   */
  private async loadAllWorldsData(
    worldIDs: number[],
    onProgress: (progress: number, status: string) => void,
  ): Promise<WorldExportData[]> {
    const worldsData: WorldExportData[] = [];

    for (let i = 0; i < worldIDs.length; i++) {
      const worldID = worldIDs[i];
      const progress = (i / worldIDs.length) * 100;
      onProgress(progress, `Lade Welt ${i + 1}/${worldIDs.length}...`);

      try {
        // Check if world exists in IndexedDB
        const existsInIndexedDB = await this.worldStorage.worldExists(worldID);

        if (existsInIndexedDB) {
          // Load from IndexedDB
          const worldData = await this.loadWorldFromIndexedDB(worldID);
          worldsData.push(worldData);
        } else {
          // Load from public folder
          const worldData = await this.loadWorldFromPublic(worldID);
          worldsData.push(worldData);
        }
      } catch (error) {
        this.logger.log(
          LogLevelTypes.WARN,
          `ExportWorldPackageUseCase: Failed to load world ${worldID}: ${error}`,
        );
        // Continue with other worlds
      }
    }

    onProgress(100, "Alle Welten geladen");
    return worldsData;
  }

  /**
   * Load a world from IndexedDB
   */
  private async loadWorldFromIndexedDB(
    worldID: number,
  ): Promise<WorldExportData> {
    const metadata = await this.worldStorage.getWorldMetadata(worldID);
    if (!metadata) {
      throw new Error(`World ${worldID} metadata not found in IndexedDB`);
    }

    const files = await this.worldStorage.getAllFiles(worldID);
    if (files.length === 0) {
      throw new Error(`No files found for world ${worldID} in IndexedDB`);
    }

    // Parse world.json to get description
    const worldJsonFile = files.find((f) => f.path === "world.json");
    let description: string | undefined;
    let elementCount: number | undefined;

    if (worldJsonFile) {
      try {
        const worldJson = JSON.parse(await worldJsonFile.blob.text());
        description = worldJson.world?.description;
        elementCount = worldJson.world?.elements?.length;
      } catch {
        // Ignore parse errors
      }
    }

    return {
      originalWorldID: worldID,
      newWorldID: worldID, // Will be reassigned later
      worldName: metadata.worldName,
      worldFolder: metadata.worldFolder,
      source: "indexeddb",
      files,
      elementCount: elementCount || metadata.elementCount,
      description,
    };
  }

  /**
   * Load a world from public folder using manifest.json
   */
  private async loadWorldFromPublic(worldID: number): Promise<WorldExportData> {
    // First, load the worlds.json to find the world info
    const indexResponse = await fetch(this.baseUrl + "worlds.json");
    if (!indexResponse.ok) {
      throw new Error("Failed to load worlds.json from public folder");
    }

    const worldsIndex = await indexResponse.json();
    const worldInfo = worldsIndex.worlds?.find(
      (w: WorldsIndexEntry) => w.worldID === worldID,
    );

    if (!worldInfo) {
      throw new Error(`World ${worldID} not found in public worlds.json`);
    }

    const worldBaseUrl = `${this.baseUrl}${worldInfo.worldFolder}/`;
    const files: Array<{ path: string; blob: Blob }> = [];

    // Try to load manifest.json for complete file list
    try {
      const manifestResponse = await fetch(`${worldBaseUrl}manifest.json`);
      if (manifestResponse.ok) {
        const manifest = await manifestResponse.json();

        this.logger.log(
          LogLevelTypes.INFO,
          `ExportWorldPackageUseCase: Loading ${manifest.fileCount} files from manifest for world ${worldInfo.worldName}`,
        );

        // Load all files listed in manifest (except manifest.json itself)
        const filesToLoad = manifest.files.filter(
          (f: string) => f !== "manifest.json",
        );

        for (const filePath of filesToLoad) {
          try {
            const fileResponse = await fetch(`${worldBaseUrl}${filePath}`);
            if (fileResponse.ok) {
              const blob = await fileResponse.blob();
              files.push({ path: filePath, blob });
            }
          } catch (error) {
            this.logger.log(
              LogLevelTypes.WARN,
              `ExportWorldPackageUseCase: Failed to load file ${filePath}: ${error}`,
            );
          }
        }

        // Get world info from world.json
        const worldJsonFile = files.find((f) => f.path === "world.json");
        let description = worldInfo.description;
        let elementCount = worldInfo.elementCount;

        if (worldJsonFile) {
          try {
            const worldJson = JSON.parse(await worldJsonFile.blob.text());
            description = worldJson.world?.worldDescription || description;
            elementCount = worldJson.world?.elements?.length || elementCount;
          } catch {
            // Use default values
          }
        }

        return {
          originalWorldID: worldID,
          newWorldID: worldID,
          worldName: worldInfo.worldName,
          worldFolder: worldInfo.worldFolder,
          source: "public",
          files,
          elementCount,
          description,
        };
      }
    } catch {
      this.logger.log(
        LogLevelTypes.WARN,
        `ExportWorldPackageUseCase: No manifest.json found for world ${worldInfo.worldName}, using fallback`,
      );
    }

    // Fallback: Load world.json and element files individually (limited H5P support)
    return this.loadWorldFromPublicFallback(worldID, worldInfo);
  }

  /**
   * Fallback method for loading public world without manifest
   * Limited H5P support - only loads basic files
   */
  private async loadWorldFromPublicFallback(
    worldID: number,
    worldInfo: WorldsIndexEntry,
  ): Promise<WorldExportData> {
    const worldBaseUrl = `${this.baseUrl}${worldInfo.worldFolder}/`;
    const files: Array<{ path: string; blob: Blob }> = [];

    // Load world.json
    const worldJsonUrl = `${worldBaseUrl}world.json`;
    const worldJsonResponse = await fetch(worldJsonUrl);
    if (!worldJsonResponse.ok) {
      throw new Error(`Failed to load world.json for world ${worldID}`);
    }

    const worldJson = await worldJsonResponse.json();

    // Add world.json
    files.push({
      path: "world.json",
      blob: new Blob([JSON.stringify(worldJson, null, 2)], {
        type: "application/json",
      }),
    });

    // Load all element files
    const elements = worldJson.world?.elements || [];
    for (const element of elements) {
      try {
        const elementFiles = await this.loadElementFilesFromPublic(
          worldInfo.worldFolder,
          element.elementId,
          element.elementFileType,
          element.elementCategory,
        );
        files.push(...elementFiles);
      } catch (error) {
        this.logger.log(
          LogLevelTypes.WARN,
          `ExportWorldPackageUseCase: Failed to load element ${element.elementId}: ${error}`,
        );
      }
    }

    return {
      originalWorldID: worldID,
      newWorldID: worldID,
      worldName: worldInfo.worldName,
      worldFolder: worldInfo.worldFolder,
      source: "public",
      files,
      elementCount: worldInfo.elementCount || elements.length,
      description: worldInfo.description,
    };
  }

  /**
   * Load element files from public folder
   */
  private async loadElementFilesFromPublic(
    worldFolder: string,
    elementID: number,
    fileType: string,
    category: string,
  ): Promise<Array<{ path: string; blob: Blob }>> {
    const files: Array<{ path: string; blob: Blob }> = [];
    const elementsBase = `${this.baseUrl}${worldFolder}/elements/`;

    // Skip adaptivity elements (no files)
    if (category === "adaptivity" || fileType === "adaptivity") {
      return files;
    }

    // Check if H5P
    const isH5P =
      category === "h5p" || category === "primitiveH5P" || fileType === "h5p";

    if (isH5P) {
      // H5P elements are folders - load all files recursively
      await this.loadH5PFolderFromPublic(elementsBase, elementID, files);
    } else {
      // Regular file
      const fileUrl = `${elementsBase}${elementID}.${fileType}`;
      try {
        const response = await fetch(fileUrl);
        if (response.ok) {
          const blob = await response.blob();
          files.push({
            path: `elements/${elementID}.${fileType}`,
            blob,
          });
        }
      } catch (error) {
        this.logger.log(
          LogLevelTypes.WARN,
          `ExportWorldPackageUseCase: Failed to load file ${fileUrl}: ${error}`,
        );
      }
    }

    return files;
  }

  /**
   * Load H5P folder contents from public folder
   * Note: This is a simplified implementation - a full solution would need
   * a manifest file or server-side support to list files
   */
  private async loadH5PFolderFromPublic(
    elementsBase: string,
    elementID: number,
    files: Array<{ path: string; blob: Blob }>,
  ): Promise<void> {
    // H5P structure: elementID/h5p.json, elementID/content/, etc.
    const h5pBase = `${elementsBase}${elementID}/`;

    // Load essential H5P files
    const h5pFiles = ["h5p.json", "content/content.json"];

    for (const h5pFile of h5pFiles) {
      try {
        const response = await fetch(`${h5pBase}${h5pFile}`);
        if (response.ok) {
          const blob = await response.blob();
          files.push({
            path: `elements/${elementID}/${h5pFile}`,
            blob,
          });
        }
      } catch {
        // File might not exist, continue
      }
    }

    // Try to load h5p.json to find library dependencies
    try {
      const h5pJsonResponse = await fetch(`${h5pBase}h5p.json`);
      if (h5pJsonResponse.ok) {
        const h5pJson = await h5pJsonResponse.json();

        // Load main library if specified
        if (h5pJson.mainLibrary) {
          // Note: Loading H5P libraries would require more complex logic
          // For now, we assume the essential files are h5p.json and content
        }
      }
    } catch {
      // Ignore errors
    }
  }

  /**
   * Reassign world IDs sequentially starting from 1
   */
  private reassignWorldIDs(worlds: WorldExportData[]): WorldExportData[] {
    return worlds.map((world, index) => {
      const newWorldID = index + 1;
      const newWorldFolder = this.sanitizeFolderName(world.worldName);

      // Update world.json content with new ID
      const worldJsonFile = world.files.find((f) => f.path === "world.json");
      if (worldJsonFile) {
        // We need to update the world.json with the new ID
        // This will be done when creating the ZIP
      }

      return {
        ...world,
        newWorldID,
        worldFolder: newWorldFolder,
      };
    });
  }

  /**
   * Sanitize folder name for file system compatibility
   */
  private sanitizeFolderName(name: string): string {
    return name
      .replace(/[^a-zA-Z0-9_\-\s]/g, "") // Remove special chars
      .replace(/\s+/g, "_") // Replace spaces with underscores
      .substring(0, 50); // Limit length
  }

  /**
   * Generate worlds.json index file
   */
  private generateWorldsIndex(worlds: WorldExportData[]): {
    worlds: WorldsIndexEntry[];
  } {
    return {
      worlds: worlds.map((world) => ({
        worldID: world.newWorldID,
        worldName: world.worldName,
        worldFolder: world.worldFolder,
        description: world.description,
        elementCount: world.elementCount,
      })),
    };
  }

  /**
   * Create the ZIP package with all worlds and worlds.json
   */
  private async createZipPackage(
    worlds: WorldExportData[],
    worldsIndex: { worlds: WorldsIndexEntry[] },
    onProgress: (progress: number, status: string) => void,
  ): Promise<Blob> {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();

    // Add worlds.json at root
    zip.file(
      "worlds.json",
      new Blob([JSON.stringify(worldsIndex, null, 2)], {
        type: "application/json",
      }),
    );

    // Add each world's files
    let totalFiles = worlds.reduce((sum, w) => sum + w.files.length, 0);
    let processedFiles = 0;

    for (const world of worlds) {
      const worldFolder = zip.folder(world.worldFolder);
      if (!worldFolder) continue;

      // Collect all file paths for this world's manifest
      const worldFilePaths: string[] = [];

      for (const file of world.files) {
        let blob = file.blob;

        // Update world.json with new world ID
        if (file.path === "world.json") {
          try {
            const worldJson = JSON.parse(await file.blob.text());
            if (worldJson.world) {
              worldJson.world.worldId = world.newWorldID;
            }
            blob = new Blob([JSON.stringify(worldJson, null, 2)], {
              type: "application/json",
            });
          } catch {
            // Use original blob if parsing fails
          }
        }

        // Skip old manifest.json from source (we'll generate a new one)
        if (file.path === "manifest.json") {
          continue;
        }

        worldFolder.file(file.path, blob);
        worldFilePaths.push(file.path);
        processedFiles++;

        const progress = (processedFiles / totalFiles) * 100;
        onProgress(
          progress,
          `Füge Dateien hinzu... ${processedFiles}/${totalFiles}`,
        );
      }

      // Generate manifest.json for this world
      const manifest = {
        worldName: world.worldName,
        generatedAt: new Date().toISOString(),
        fileCount: worldFilePaths.length + 1, // +1 for manifest.json itself
        files: [...worldFilePaths, "manifest.json"].sort(),
      };
      worldFolder.file(
        "manifest.json",
        new Blob([JSON.stringify(manifest, null, 2)], {
          type: "application/json",
        }),
      );
    }

    // Generate ZIP
    onProgress(90, "Komprimiere ZIP-Datei...");
    const zipBlob = await zip.generateAsync(
      { type: "blob", compression: "DEFLATE" },
      (metadata) => {
        const progress = 90 + metadata.percent * 0.1;
        onProgress(progress, `Komprimiere... ${Math.round(metadata.percent)}%`);
      },
    );

    return zipBlob;
  }

  /**
   * Format bytes to human-readable string
   */
  private formatBytes(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
}
