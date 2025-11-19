import IWorldManagerModalPresenter from "./IWorldManagerModalPresenter";
import WorldManagerModalViewModel from "./WorldManagerModalViewModel";

export default class WorldManagerModalPresenter
  implements IWorldManagerModalPresenter
{
  constructor(private viewModel: WorldManagerModalViewModel) {}

  setupElectronListeners(): void {
    const isElectron = typeof window !== "undefined" && window.electronAPI;
    if (!isElectron) return;

    console.log("WorldManagerModalPresenter: Setting up Electron listeners");

    // Listen for "Open World Manager" menu command
    window.electronAPI!.onOpenWorldManager(() => {
      console.log(
        "WorldManagerModalPresenter: Received open-world-manager event",
      );
      console.log(
        "WorldManagerModalPresenter: Current showModal value:",
        this.viewModel.showModal.Value,
      );
      this.viewModel.showModal.Value = true;
      console.log(
        "WorldManagerModalPresenter: New showModal value:",
        this.viewModel.showModal.Value,
      );
    });

    // Listen for "Import MBZ" menu command
    window.electronAPI!.onImportMBZFile((filePath) => {
      this.handleImportMBZ(filePath);
    });

    // Listen for import progress
    window.electronAPI!.onImportProgress((progress) => {
      this.viewModel.importProgress.Value = progress;
    });
  }

  cleanupElectronListeners(): void {
    const isElectron = typeof window !== "undefined" && window.electronAPI;
    if (!isElectron) return;

    window.electronAPI!.removeAllListeners("open-world-manager");
    window.electronAPI!.removeAllListeners("import-mbz-file");
    window.electronAPI!.removeAllListeners("import-progress");
  }

  async loadWorlds(): Promise<void> {
    const isElectron = typeof window !== "undefined" && window.electronAPI;
    if (!isElectron) return;

    this.viewModel.loading.Value = true;
    try {
      const worldsList = await window.electronAPI!.listWorlds();
      this.viewModel.worlds.Value = worldsList;
    } catch (error) {
      console.error("Failed to load worlds:", error);
    } finally {
      this.viewModel.loading.Value = false;
    }
  }

  onModalOpen(): void {
    if (this.viewModel.showModal.Value) {
      this.loadWorlds();
    }
  }

  private async handleImportMBZ(filePath: string): Promise<void> {
    const isElectron = typeof window !== "undefined" && window.electronAPI;
    if (!isElectron) return;

    this.viewModel.importingFile.Value = filePath;
    this.viewModel.importProgress.Value = {
      message: "Starte Import...",
      progress: 0,
    };

    try {
      const result = await window.electronAPI!.importMBZ(filePath);

      if (result.success) {
        this.viewModel.importProgress.Value = {
          message: `Lernwelt "${result.worldName}" erfolgreich importiert!`,
          progress: 100,
        };

        // Reload worlds list in modal
        await this.loadWorlds();

        // Clear progress after showing success
        setTimeout(() => {
          this.viewModel.importProgress.Value = null;
          this.viewModel.importingFile.Value = null;
        }, 2000);
      } else {
        this.viewModel.importProgress.Value = {
          message: `Fehler: ${result.error}`,
          progress: 0,
        };

        setTimeout(() => {
          this.viewModel.importProgress.Value = null;
          this.viewModel.importingFile.Value = null;
        }, 5000);
      }
    } catch (error) {
      console.error("Import failed:", error);
      this.viewModel.importProgress.Value = {
        message: `Fehler beim Import: ${error}`,
        progress: 0,
      };

      setTimeout(() => {
        this.viewModel.importProgress.Value = null;
        this.viewModel.importingFile.Value = null;
      }, 5000);
    }
  }
}
