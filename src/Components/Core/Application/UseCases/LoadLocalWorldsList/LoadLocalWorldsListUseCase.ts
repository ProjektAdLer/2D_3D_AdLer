import { inject, injectable } from "inversify";
import ILoadLocalWorldsListUseCase from "./ILoadLocalWorldsListUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type IWorldManagementPort from "../../Ports/Interfaces/IWorldManagementPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import type IWorldStorageAdapter from "../../Ports/WorldStoragePort/IWorldStorageAdapter";
import type IBackendPort from "../../Ports/Interfaces/IBackendPort";
import LocalWorldInfoTO from "../../DataTransferObjects/LocalWorldInfoTO";

@injectable()
export default class LoadLocalWorldsListUseCase
  implements ILoadLocalWorldsListUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(PORT_TYPES.IWorldManagementPort)
    private worldManagementPort: IWorldManagementPort,
    @inject(PORT_TYPES.IWorldStorageAdapter)
    private worldStorage: IWorldStorageAdapter,
    @inject(CORE_TYPES.IBackendAdapter)
    private backendAdapter: IBackendPort,
  ) {}

  async executeAsync(): Promise<void> {
    this.logger.log(
      LogLevelTypes.TRACE,
      "LoadLocalWorldsListUseCase: Loading worlds list (IndexedDB + Public)",
    );

    try {
      const worldInfos: LocalWorldInfoTO[] = [];

      // 1. Get all worlds from IndexedDB
      const indexedDBWorlds = await this.worldStorage.getAllWorlds();
      const sizes = await this.worldStorage.getAllWorldSizes();

      for (const world of indexedDBWorlds) {
        const sizeInBytes = sizes.get(world.worldID) || 0;
        worldInfos.push(
          new LocalWorldInfoTO(
            world.worldID,
            world.worldName,
            world.worldFolder,
            world.elementCount || 0,
            sizeInBytes,
            "indexeddb",
            world.importTimestamp,
          ),
        );
      }

      // 2. Get all worlds from public folder (via backend)
      try {
        const publicWorlds =
          await this.backendAdapter.getCoursesAvailableForUser("dummy-token");

        // Filter out worlds already in IndexedDB to avoid duplicates
        const indexedDBWorldIDs = new Set(
          indexedDBWorlds.map((w) => w.worldID),
        );

        for (const course of publicWorlds.courses) {
          if (!indexedDBWorldIDs.has(course.courseID)) {
            worldInfos.push(
              new LocalWorldInfoTO(
                course.courseID,
                course.courseName,
                course.courseName,
                0, // Element count not available for public worlds
                0, // Size not calculable for public folder
                "public",
                0, // No import timestamp for public worlds
              ),
            );
          }
        }
      } catch (error) {
        this.logger.log(
          LogLevelTypes.WARN,
          "LoadLocalWorldsListUseCase: Failed to load public worlds, showing IndexedDB worlds only",
        );
      }

      // 3. Sort: IndexedDB worlds first, then by name
      worldInfos.sort((a, b) => {
        if (a.source !== b.source) {
          return a.source === "indexeddb" ? -1 : 1;
        }
        return a.worldName.localeCompare(b.worldName);
      });

      this.logger.log(
        LogLevelTypes.INFO,
        `LoadLocalWorldsListUseCase: Loaded ${worldInfos.length} worlds (${indexedDBWorlds.length} from IndexedDB)`,
      );

      // Notify presentation layer via port
      this.worldManagementPort.onLocalWorldsListLoaded(worldInfos);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error loading worlds";

      this.logger.log(
        LogLevelTypes.ERROR,
        `LoadLocalWorldsListUseCase: Loading failed - ${errorMessage}`,
      );

      this.worldManagementPort.onWorldManagementError(errorMessage);
    }
  }
}
