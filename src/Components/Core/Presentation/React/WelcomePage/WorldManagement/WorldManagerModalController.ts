import { injectable } from "inversify";
import IWorldManagerModalController from "./IWorldManagerModalController";
import WorldManagerModalViewModel from "./WorldManagerModalViewModel";
import type IImportLearningWorldUseCase from "../../../../Application/UseCases/ImportLearningWorld/IImportLearningWorldUseCase";
import type IDeleteLearningWorldUseCase from "../../../../Application/UseCases/DeleteLearningWorld/IDeleteLearningWorldUseCase";
import type IExportLearningWorldUseCase from "../../../../Application/UseCases/ExportLearningWorld/IExportLearningWorldUseCase";
import type IExportWorldPackageUseCase from "../../../../Application/UseCases/ExportWorldPackage/IExportWorldPackageUseCase";
import type ILoadLocalWorldsListUseCase from "../../../../Application/UseCases/LoadLocalWorldsList/ILoadLocalWorldsListUseCase";
import type IGetWorldsStorageInfoUseCase from "../../../../Application/UseCases/GetWorldsStorageInfo/IGetWorldsStorageInfoUseCase";

/**
 * Controller for WorldManagerModal
 * Handles user interactions and calls Use Cases for business logic
 */
@injectable()
export default class WorldManagerModalController
  implements IWorldManagerModalController
{
  private hasChanges: boolean = false;

  constructor(
    private viewModel: WorldManagerModalViewModel,
    private importWorldUseCase: IImportLearningWorldUseCase,
    private deleteWorldUseCase: IDeleteLearningWorldUseCase,
    private exportWorldUseCase: IExportLearningWorldUseCase,
    private exportWorldPackageUseCase: IExportWorldPackageUseCase,
    private loadLocalWorldsListUseCase: ILoadLocalWorldsListUseCase,
    private getStorageInfoUseCase: IGetWorldsStorageInfoUseCase,
  ) {}

  /**
   * Opens the modal and loads world data
   */
  async onOpenModal(): Promise<void> {
    this.viewModel.showModal.Value = true;
    this.viewModel.loading.Value = true;
    this.hasChanges = false; // Reset changes flag

    // Load worlds and storage info in parallel
    await Promise.all([
      this.loadLocalWorldsListUseCase.executeAsync(),
      this.getStorageInfoUseCase.executeAsync(),
    ]);
  }

  /**
   * Closes the modal and signals page reload if changes were made
   */
  onCloseModal(): void {
    this.viewModel.showModal.Value = false;

    // Signal page reload if worlds were imported or deleted to refresh entities
    // The View handles the actual reload
    if (this.hasChanges) {
      console.log(
        "WorldManagerModalController: Signaling page reload to refresh world entities",
      );
      this.viewModel.shouldReloadPage.Value = true;
    }
  }

  /**
   * Initiates delete confirmation by setting ViewModel state
   * The View shows the confirmation dialog and calls confirmDelete/cancelDelete
   */
  async onDeleteWorld(worldID: number): Promise<void> {
    // Find world info for confirmation dialog
    const world = this.viewModel.worlds.Value.find(
      (w) => w.worldID === worldID,
    );

    if (!world) {
      console.error(`World with ID ${worldID} not found`);
      return;
    }

    // Only allow deleting IndexedDB worlds
    if (world.source !== "indexeddb") {
      // Set error state - View handles display
      this.viewModel.deleteError.Value = "preinstalled_cannot_delete";
      return;
    }

    // Set confirmation state - View shows the dialog
    this.viewModel.deleteConfirmation.Value = {
      worldID: world.worldID,
      worldName: world.worldName,
      sizeFormatted: world.sizeFormatted,
    };
  }

  /**
   * Called by View when user confirms deletion
   */
  async confirmDelete(): Promise<void> {
    const confirmation = this.viewModel.deleteConfirmation.Value;
    if (!confirmation) return;

    // Clear confirmation dialog
    this.viewModel.deleteConfirmation.Value = null;

    try {
      // Use Case handles deletion and notifies presenter via port
      await this.deleteWorldUseCase.executeAsync({
        worldID: confirmation.worldID,
      });

      // Mark that changes were made
      this.hasChanges = true;

      // Reload storage info after deletion
      await this.getStorageInfoUseCase.executeAsync();
    } catch (error) {
      console.error("Failed to delete world:", error);
      // Set error state - View handles display with i18n
      this.viewModel.deleteError.Value =
        error instanceof Error ? error.message : "unknown_error";
    }
  }

  /**
   * Called by View when user cancels deletion
   */
  cancelDelete(): void {
    this.viewModel.deleteConfirmation.Value = null;
  }

  /**
   * Clears the delete error (called by View after displaying)
   */
  clearDeleteError(): void {
    this.viewModel.deleteError.Value = null;
  }

  /**
   * Imports a world from MBZ file
   */
  async onImportWorld(file: File): Promise<void> {
    this.viewModel.isImporting.Value = true;
    this.viewModel.importError.Value = null;
    this.viewModel.importSuccess.Value = null;
    this.viewModel.importProgress.Value = 0;
    this.viewModel.importStatus.Value = "import_starting";

    try {
      // Use Case handles import and notifies presenter via port
      // Progress callback updates ViewModel in real-time
      await this.importWorldUseCase.executeAsync({
        file,
        onProgress: (current, total, status) => {
          this.viewModel.importProgress.Value = Math.round(
            (current / total) * 100,
          );
          this.viewModel.importStatus.Value = status;
        },
      });

      // Mark that changes were made
      this.hasChanges = true;

      // Reload worlds and storage info after successful import
      await Promise.all([
        this.loadLocalWorldsListUseCase.executeAsync(),
        this.getStorageInfoUseCase.executeAsync(),
      ]);
    } catch (error) {
      console.error("Failed to import world:", error);
      this.viewModel.importProgress.Value = 0;
      this.viewModel.importStatus.Value = "";
      // Error is already handled by Use Case and sent via port
    }
  }

  /**
   * Exports a world as ZIP
   */
  async onExportWorld(worldID: number): Promise<void> {
    this.viewModel.isExporting.Value = true;
    this.viewModel.exportProgress.Value = 0;
    this.viewModel.exportStatus.Value = "export_starting";
    this.viewModel.exportingWorldID.Value = worldID;
    this.viewModel.exportError.Value = null;

    try {
      // Use Case handles export and notifies presenter via port (which sets pendingDownload)
      // Progress callback updates ViewModel in real-time
      await this.exportWorldUseCase.executeAsync({
        worldID,
        onProgress: (current, total, status) => {
          this.viewModel.exportProgress.Value = Math.round(
            (current / total) * 100,
          );
          this.viewModel.exportStatus.Value = status;
        },
      });

      // Reset export state after short delay to show completion
      setTimeout(() => {
        this.viewModel.isExporting.Value = false;
        this.viewModel.exportProgress.Value = 0;
        this.viewModel.exportStatus.Value = "";
        this.viewModel.exportingWorldID.Value = null;
      }, 1500);
    } catch (error) {
      console.error("Failed to export world:", error);
      this.viewModel.isExporting.Value = false;
      this.viewModel.exportProgress.Value = 0;
      this.viewModel.exportStatus.Value = "";
      this.viewModel.exportingWorldID.Value = null;
      // Set error state - View handles display with i18n
      this.viewModel.exportError.Value =
        error instanceof Error ? error.message : "unknown_error";
    }
  }

  /**
   * Clears the export error (called by View after displaying)
   */
  clearExportError(): void {
    this.viewModel.exportError.Value = null;
  }

  /**
   * Refreshes the world list and storage info
   */
  async onRefresh(): Promise<void> {
    this.viewModel.loading.Value = true;

    await Promise.all([
      this.loadLocalWorldsListUseCase.executeAsync(),
      this.getStorageInfoUseCase.executeAsync(),
    ]);
  }

  /**
   * Clears the pending download (called by View after download triggered)
   */
  clearPendingDownload(): void {
    this.viewModel.pendingDownload.Value = null;
  }

  // ========== Publish Mode (Dozentenmodus) ==========

  /**
   * Toggles publish mode on/off
   */
  togglePublishMode(): void {
    const newValue = !this.viewModel.isPublishMode.Value;
    this.viewModel.isPublishMode.Value = newValue;

    // Clear selections when disabling publish mode
    if (!newValue) {
      this.viewModel.selectedWorldIDs.Value = new Set();
    }
  }

  /**
   * Toggles selection of a specific world
   */
  toggleWorldSelection(worldID: number): void {
    const current = new Set(this.viewModel.selectedWorldIDs.Value);
    if (current.has(worldID)) {
      current.delete(worldID);
    } else {
      current.add(worldID);
    }
    this.viewModel.selectedWorldIDs.Value = current;
  }

  /**
   * Selects all worlds
   */
  selectAllWorlds(): void {
    const allIDs = this.viewModel.worlds.Value.map((w) => w.worldID);
    this.viewModel.selectedWorldIDs.Value = new Set(allIDs);
  }

  /**
   * Deselects all worlds
   */
  deselectAllWorlds(): void {
    this.viewModel.selectedWorldIDs.Value = new Set();
  }

  /**
   * Exports selected worlds as a LearningWorlds.zip package
   */
  async exportSelectedWorldsPackage(): Promise<void> {
    const selectedIDs = Array.from(this.viewModel.selectedWorldIDs.Value);

    if (selectedIDs.length === 0) {
      this.viewModel.packageExportError.Value = "no_worlds_selected";
      return;
    }

    this.viewModel.isExportingPackage.Value = true;
    this.viewModel.packageExportProgress.Value = 0;
    this.viewModel.packageExportStatus.Value = "package_export_starting";
    this.viewModel.packageExportError.Value = null;

    try {
      // Call Use Case with progress callback
      await this.exportWorldPackageUseCase.executeAsync({
        worldIDs: selectedIDs,
        onProgress: (current, total, status) => {
          this.viewModel.packageExportProgress.Value = Math.round(
            (current / total) * 100,
          );
          this.viewModel.packageExportStatus.Value = status;
        },
      });

      // Note: Reset of export states is handled by presenter after successful export
    } catch (error) {
      console.error("Failed to export worlds package:", error);
      this.viewModel.isExportingPackage.Value = false;
      this.viewModel.packageExportProgress.Value = 0;
      this.viewModel.packageExportStatus.Value = "";
      this.viewModel.packageExportError.Value =
        error instanceof Error ? error.message : "unknown_error";
    }
  }

  /**
   * Clears the package export error
   */
  clearPackageExportError(): void {
    this.viewModel.packageExportError.Value = null;
  }
}
