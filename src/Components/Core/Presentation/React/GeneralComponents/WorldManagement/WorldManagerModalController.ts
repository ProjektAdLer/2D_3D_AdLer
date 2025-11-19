import IWorldManagerModalController from "./IWorldManagerModalController";
import WorldManagerModalViewModel from "./WorldManagerModalViewModel";

export default class WorldManagerModalController
  implements IWorldManagerModalController
{
  private presenter: any; // Will be injected by builder after construction

  constructor(private viewModel: WorldManagerModalViewModel) {}

  async onOpenFileDialog(): Promise<void> {
    const isElectron = typeof window !== "undefined" && window.electronAPI;
    if (!isElectron) return;

    try {
      await window.electronAPI!.openMBZFileDialog();
      // The import will be handled by the onImportMBZFile listener in presenter
    } catch (error) {
      console.error("Failed to open file dialog:", error);
    }
  }

  async onDeleteWorld(worldName: string): Promise<void> {
    const isElectron = typeof window !== "undefined" && window.electronAPI;
    if (!isElectron) return;

    const confirmed = window.confirm(
      `Möchten Sie die Lernwelt "${worldName}" wirklich löschen?`,
    );

    if (!confirmed) return;

    try {
      const result = await window.electronAPI!.deleteWorld(worldName);

      if (result.success) {
        // Reload worlds list via presenter
        await this.presenter.loadWorlds();
      } else {
        alert(`Fehler beim Löschen: ${result.error}`);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert(`Fehler beim Löschen: ${error}`);
    }
  }

  onCloseModal(): void {
    this.viewModel.showModal.Value = false;
  }
}
