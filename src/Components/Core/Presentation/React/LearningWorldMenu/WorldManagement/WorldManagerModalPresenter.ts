import { injectable } from "inversify";
import IWorldManagerModalPresenter from "./IWorldManagerModalPresenter";
import WorldManagerModalViewModel, {
  WorldInfo,
  StorageInfo,
} from "./WorldManagerModalViewModel";
import LocalStore from "../../../../Adapters/LocalStore/LocalStore";
import { formatBytes } from "../../../Utils/formatBytes";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../DependencyInjection/CoreTypes";
import type IBackendPort from "../../../../Application/Ports/Interfaces/IBackendPort";

/**
 * Presenter for WorldManagerModal
 * Loads world data from both IndexedDB and public folder,
 * calculates storage statistics, and manages data flow to ViewModel
 */
@injectable()
export default class WorldManagerModalPresenter
  implements IWorldManagerModalPresenter
{
  private localStore: LocalStore;
  private backendAdapter: IBackendPort;

  constructor(private viewModel: WorldManagerModalViewModel) {
    this.localStore = new LocalStore();
    this.localStore.init().catch((error) => {
      console.error(
        "WorldManagerModalPresenter: Failed to init LocalStore:",
        error,
      );
    });

    // Get backendAdapter from DI container
    this.backendAdapter = CoreDIContainer.get<IBackendPort>(
      CORE_TYPES.IBackendAdapter,
    );
  }

  /**
   * Loads all worlds and storage information
   */
  async loadWorlds(): Promise<void> {
    this.viewModel.loading.Value = true;

    try {
      const worldInfos: WorldInfo[] = [];

      // 1. Load IndexedDB worlds with size calculation
      const indexedDBWorlds = await this.localStore.getAllWorlds();

      for (const world of indexedDBWorlds) {
        const sizeInBytes = await this.localStore.getWorldSize(world.worldID);

        worldInfos.push({
          worldID: world.worldID,
          worldName: world.worldName,
          worldFolder: world.worldFolder,
          elementCount: world.elementCount || 0,
          sizeInBytes,
          sizeFormatted: formatBytes(sizeInBytes),
          source: "indexeddb",
        });
      }

      // 2. Load public folder worlds
      try {
        const userToken = "dummy-token"; // File-based backend doesn't need real token
        const coursesResponse =
          await this.backendAdapter.getCoursesAvailableForUser(userToken);

        // Filter out worlds already in IndexedDB to avoid duplicates
        const indexedDBWorldIDs = new Set(
          indexedDBWorlds.map((w) => w.worldID),
        );

        for (const course of coursesResponse.courses) {
          if (!indexedDBWorldIDs.has(course.courseID)) {
            worldInfos.push({
              worldID: course.courseID,
              worldName: course.courseName,
              worldFolder: course.courseName,
              elementCount: 0, // Not available for public worlds
              sizeInBytes: 0, // Not calculable for public folder
              sizeFormatted: "N/A",
              source: "public",
            });
          }
        }
      } catch (error) {
        console.warn(
          "Failed to load public worlds, showing IndexedDB worlds only:",
          error,
        );
      }

      // 3. Load storage information
      const storageInfo = await this.loadStorageInfo();

      // 4. Sort: IndexedDB worlds first, then by name
      worldInfos.sort((a, b) => {
        if (a.source !== b.source) {
          return a.source === "indexeddb" ? -1 : 1;
        }
        return a.worldName.localeCompare(b.worldName);
      });

      // Update ViewModel
      this.viewModel.worlds.Value = worldInfos;
      this.viewModel.storageInfo.Value = storageInfo;
    } catch (error) {
      console.error("Failed to load worlds:", error);
      this.viewModel.worlds.Value = [];
      this.viewModel.storageInfo.Value = null;
    } finally {
      this.viewModel.loading.Value = false;
    }
  }

  /**
   * Loads storage quota and usage information
   */
  private async loadStorageInfo(): Promise<StorageInfo | null> {
    try {
      const info = await this.localStore.getStorageInfo();

      if (info.used !== undefined && info.quota !== undefined) {
        const used = info.used;
        const quota = info.quota;
        const available = info.available || quota - used;
        const usedPercent = quota > 0 ? (used / quota) * 100 : 0;

        return {
          used,
          quota,
          available,
          usedFormatted: formatBytes(used),
          quotaFormatted: formatBytes(quota),
          usedPercent: Math.round(usedPercent),
        };
      }

      return null;
    } catch (error) {
      console.error("Failed to load storage info:", error);
      return null;
    }
  }

  /**
   * Deletes a world from IndexedDB
   */
  async deleteWorld(worldID: number): Promise<void> {
    await this.localStore.deleteWorld(worldID);
    console.log(`World ${worldID} deleted successfully`);
  }
}
