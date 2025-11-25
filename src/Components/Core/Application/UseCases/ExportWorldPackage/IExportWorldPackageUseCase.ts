import { IAsyncUsecase } from "../../Abstract/IAsyncUsecase";

export type PackageExportProgressCallback = (
  current: number,
  total: number,
  status: string,
) => void;

/**
 * Parameters for exporting multiple worlds as a LearningWorlds package
 */
export interface ExportWorldPackageParams {
  /** Array of world IDs to include in the package */
  worldIDs: number[];
  /** Progress callback for UI updates */
  onProgress?: PackageExportProgressCallback;
}

/**
 * Result of the world package export
 */
export interface ExportWorldPackageResult {
  /** The generated ZIP file blob */
  zipBlob: Blob;
  /** File name for the ZIP (LearningWorlds.zip) */
  fileName: string;
  /** Number of worlds exported */
  worldCount: number;
  /** Total size in bytes */
  totalSize: number;
}

/**
 * Use case for exporting multiple learning worlds as a deployable package.
 *
 * This use case:
 * 1. Loads files from IndexedDB and/or public folder for selected worlds
 * 2. Reassigns world IDs sequentially (1, 2, 3, ...) to avoid conflicts
 * 3. Generates a worlds.json index file
 * 4. Creates a ZIP file with the LearningWorlds structure
 *
 * The output can be directly deployed to a web server by extracting to public/LearningWorlds/
 */
export default interface IExportWorldPackageUseCase
  extends IAsyncUsecase<ExportWorldPackageParams, ExportWorldPackageResult> {}
