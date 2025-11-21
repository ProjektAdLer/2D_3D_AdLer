import { injectable } from "inversify";
import IWorldManagerModalController from "./IWorldManagerModalController";
import WorldManagerModalViewModel from "./WorldManagerModalViewModel";
import type IWorldManagerModalPresenter from "./IWorldManagerModalPresenter";

/**
 * Controller for WorldManagerModal
 * Handles user interactions and coordinates with the presenter
 */
@injectable()
export default class WorldManagerModalController
  implements IWorldManagerModalController
{
  private presenter?: IWorldManagerModalPresenter;

  constructor(private viewModel: WorldManagerModalViewModel) {}

  setPresenter(presenter: IWorldManagerModalPresenter): void {
    this.presenter = presenter;
  }

  /**
   * Opens the modal and loads world data
   */
  onOpenModal(): void {
    this.viewModel.showModal.Value = true;
    this.presenter?.loadWorlds();
  }

  /**
   * Closes the modal
   */
  onCloseModal(): void {
    this.viewModel.showModal.Value = false;
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
      await this.presenter?.deleteWorld(worldID);
      // Reload worlds after successful deletion
      await this.presenter?.loadWorlds();
    } catch (error) {
      console.error("Failed to delete world:", error);
      alert(
        `Fehler beim Löschen der Lernwelt: ${error instanceof Error ? error.message : "Unbekannter Fehler"}`,
      );
    }
  }

  /**
   * Refreshes the world list
   */
  async onRefresh(): Promise<void> {
    await this.presenter?.loadWorlds();
  }
}
