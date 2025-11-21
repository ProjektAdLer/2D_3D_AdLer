import { injectable } from "inversify";
import IWorldManagerModalPresenter from "./IWorldManagerModalPresenter";
import WorldManagerModalViewModel, {
  WorldInfo,
  StorageInfo,
} from "./WorldManagerModalViewModel";
import IWorldManagementAdapter from "../../../../Application/Ports/WorldManagementPort/IWorldManagementAdapter";
import WorldImportResultTO from "../../../../Application/DataTransferObjects/WorldImportResultTO";
import LocalWorldInfoTO from "../../../../Application/DataTransferObjects/LocalWorldInfoTO";
import StorageInfoTO from "../../../../Application/DataTransferObjects/StorageInfoTO";
import { formatBytes } from "../../../Utils/formatBytes";

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
      this.viewModel.importError.Value = result.errors.join(", ");
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
   * Called by WorldManagementPort when a world is exported
   */
  onWorldExported(worldID: number, fileData: Blob): void {
    // Trigger download in browser
    const world = this.viewModel.worlds.Value.find(
      (w) => w.worldID === worldID,
    );
    const fileName = world ? `${world.worldName}.zip` : `world_${worldID}.zip`;

    const url = URL.createObjectURL(fileData);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
    }));

    this.viewModel.worlds.Value = worldInfos;
    this.viewModel.loading.Value = false;
  }

  /**
   * Called by WorldManagementPort when an error occurs
   */
  onWorldManagementError(error: string): void {
    console.error("WorldManagerModalPresenter: Error from Use Case:", error);
    this.viewModel.importError.Value = error;
    this.viewModel.isImporting.Value = false;
    this.viewModel.loading.Value = false;
  }
}
