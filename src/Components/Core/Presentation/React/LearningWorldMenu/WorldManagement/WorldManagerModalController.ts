import { injectable } from "inversify";
import IWorldManagerModalController from "./IWorldManagerModalController";
import WorldManagerModalViewModel from "./WorldManagerModalViewModel";
import type IImportLearningWorldUseCase from "../../../../Application/UseCases/ImportLearningWorld/IImportLearningWorldUseCase";
import type IDeleteLearningWorldUseCase from "../../../../Application/UseCases/DeleteLearningWorld/IDeleteLearningWorldUseCase";
import type IExportLearningWorldUseCase from "../../../../Application/UseCases/ExportLearningWorld/IExportLearningWorldUseCase";
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
   * Closes the modal and reloads page if changes were made
   */
  onCloseModal(): void {
    this.viewModel.showModal.Value = false;

    // Reload page if worlds were imported or deleted to refresh entities
    if (this.hasChanges) {
      console.log(
        "WorldManagerModalController: Reloading page to refresh world entities",
      );
      window.location.reload();
    }
  }

  /**
   * Deletes a world after user confirmation
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
      alert("Vorinstallierte Lernwelten können nicht gelöscht werden.");
      return;
    }

    // Confirmation dialog
    const confirmed = window.confirm(
      `Möchten Sie die Lernwelt "${world.worldName}" wirklich löschen?\n\nDies wird ${world.sizeFormatted} Speicherplatz freigeben.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      // Use Case handles deletion and notifies presenter via port
      await this.deleteWorldUseCase.executeAsync({ worldID });

      // Mark that changes were made
      this.hasChanges = true;

      // Reload storage info after deletion
      await this.getStorageInfoUseCase.executeAsync();
    } catch (error) {
      console.error("Failed to delete world:", error);
      alert(
        `Fehler beim Löschen der Lernwelt: ${error instanceof Error ? error.message : "Unbekannter Fehler"}`,
      );
    }
  }

  /**
   * Imports a world from MBZ file
   */
  async onImportWorld(file: File): Promise<void> {
    this.viewModel.isImporting.Value = true;
    this.viewModel.importError.Value = null;
    this.viewModel.importSuccess.Value = null;

    try {
      // Use Case handles import and notifies presenter via port
      await this.importWorldUseCase.executeAsync({ file });

      // Mark that changes were made
      this.hasChanges = true;

      // Reload worlds and storage info after successful import
      await Promise.all([
        this.loadLocalWorldsListUseCase.executeAsync(),
        this.getStorageInfoUseCase.executeAsync(),
      ]);
    } catch (error) {
      console.error("Failed to import world:", error);
      // Error is already handled by Use Case and sent via port
    }
  }

  /**
   * Exports a world as ZIP
   */
  async onExportWorld(worldID: number): Promise<void> {
    try {
      // Use Case handles export and notifies presenter via port (which triggers download)
      await this.exportWorldUseCase.executeAsync({ worldID });
    } catch (error) {
      console.error("Failed to export world:", error);
      alert(
        `Fehler beim Exportieren der Lernwelt: ${error instanceof Error ? error.message : "Unbekannter Fehler"}`,
      );
    }
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
}
