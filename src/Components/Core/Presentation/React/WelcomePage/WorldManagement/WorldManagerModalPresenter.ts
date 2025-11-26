import { injectable } from "inversify";
import IWorldManagerModalPresenter from "./IWorldManagerModalPresenter";
import WorldManagerModalViewModel, {
  WorldInfo,
  StorageInfo,
  ImportErrorDetails,
} from "./WorldManagerModalViewModel";
import IWorldManagementAdapter from "../../../../Application/Ports/WorldManagementPort/IWorldManagementAdapter";
import WorldImportResultTO from "../../../../Application/DataTransferObjects/WorldImportResultTO";
import LocalWorldInfoTO from "../../../../Application/DataTransferObjects/LocalWorldInfoTO";
import StorageInfoTO from "../../../../Application/DataTransferObjects/StorageInfoTO";
import { formatBytes } from "../../../Utils/formatBytes";
import ValidationErrorBuilder from "../../../../Application/Utils/ValidationErrorBuilder";
import type { ValidationResult } from "../../../../Application/Services/MBZValidator";

/**
 * Presenter for WorldManagerModal
 * Implements IWorldManagementAdapter to receive data from Use Cases via Ports.
 * Transforms TOs to ViewModel format and updates the View.
 */
@injectable()
export default class WorldManagerModalPresenter
  implements IWorldManagerModalPresenter, IWorldManagementAdapter
{
  constructor(private viewModel: WorldManagerModalViewModel) {}

  /**
   * Called by WorldManagementPort when a world is imported
   */
  onWorldImported(result: WorldImportResultTO): void {
    if (result.success) {
      this.viewModel.importSuccess.Value = {
        worldName: result.worldName,
        elementCount: result.elementCount,
      };
      this.viewModel.importError.Value = null;

      // Auto-dismiss success message after 3 seconds and reset state
      setTimeout(() => {
        this.viewModel.importSuccess.Value = null;
        this.viewModel.importProgress.Value = 0;
        this.viewModel.importStatus.Value = "";
      }, 3000);
    } else {
      this.viewModel.importError.Value = {
        message: result.errors.join(", "),
        showDetails: false,
      };
      this.viewModel.importSuccess.Value = null;
    }
    this.viewModel.isImporting.Value = false;
  }

  /**
   * Called by WorldManagementPort when a world is deleted
   */
  onWorldDeleted(worldID: number): void {
    // Remove world from ViewModel
    this.viewModel.worlds.Value = this.viewModel.worlds.Value.filter(
      (world) => world.worldID !== worldID,
    );
  }

  /**
   * Called by WorldManagementPort when a world package is exported
   * Sets pendingDownload with LearningWorlds.zip - View handles the actual download
   */
  onWorldPackageExported(fileData: Blob): void {
    // Set pending download state for the package export
    this.viewModel.pendingDownload.Value = {
      fileName: "LearningWorlds.zip",
      fileData,
    };

    // Reset export states after short delay
    setTimeout(() => {
      this.viewModel.isExportingPackage.Value = false;
      this.viewModel.packageExportProgress.Value = 0;
      this.viewModel.packageExportStatus.Value = "";
    }, 1500);
  }

  /**
   * Called by WorldManagementPort when storage info is loaded
   */
  onStorageInfoLoaded(storageInfo: StorageInfoTO): void {
    const storageInfoVM: StorageInfo = {
      used: storageInfo.used,
      quota: storageInfo.quota,
      available: storageInfo.available,
      usedFormatted: formatBytes(storageInfo.used),
      quotaFormatted: formatBytes(storageInfo.quota),
      usedPercent: Math.round(storageInfo.usedPercent),
    };

    this.viewModel.storageInfo.Value = storageInfoVM;
  }

  /**
   * Called by WorldManagementPort when local worlds list is loaded
   */
  onLocalWorldsListLoaded(worlds: LocalWorldInfoTO[]): void {
    const worldInfos: WorldInfo[] = worlds.map((world) => ({
      worldID: world.worldID,
      worldName: world.worldName,
      worldFolder: world.worldFolder,
      elementCount: world.elementCount,
      sizeInBytes: world.sizeInBytes,
      sizeFormatted:
        world.source === "public" ? "N/A" : formatBytes(world.sizeInBytes),
      source: world.source,
      importedAt: world.importTimestamp || undefined,
      updatedAt: world.updatedTimestamp || undefined,
    }));

    this.viewModel.worlds.Value = worldInfos;
    this.viewModel.loading.Value = false;
  }

  /**
   * Called by WorldManagementPort when an error occurs
   */
  onWorldManagementError(error: string): void {
    console.error("WorldManagerModalPresenter: Error from Use Case:", error);
    this.viewModel.importError.Value = {
      message: error,
      showDetails: false,
    };
    this.viewModel.isImporting.Value = false;
    this.viewModel.loading.Value = false;
  }

  /**
   * Called by WorldManagementPort when validation fails
   * Creates a hybrid error message: user-friendly message + optional technical details
   */
  onImportValidationFailed(validationResult: ValidationResult): void {
    console.error(
      "WorldManagerModalPresenter: Validation failed:",
      validationResult.errors,
    );

    // Build user-friendly error message using ValidationErrorBuilder
    const mainErrorMessage = ValidationErrorBuilder.createErrorSummary(
      validationResult.errors,
    );

    // Collect technical details from all errors
    const technicalDetails = ValidationErrorBuilder.formatTechnicalDetails(
      validationResult.errors,
    );

    // Update ViewModel with error details
    const errorDetails: ImportErrorDetails = {
      message: mainErrorMessage,
      technicalDetails,
      showDetails: false, // Initially collapsed
    };

    this.viewModel.importError.Value = errorDetails;
    this.viewModel.isImporting.Value = false;
  }
}
