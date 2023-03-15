import { inject, injectable } from "inversify";
import type IBackendAdapter from "src/Components/Core/Application/Ports/Interfaces/IBackendPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import type IWorldPort from "src/Components/Core/Application/Ports/Interfaces/IWorldPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { Semaphore } from "src/Lib/Semaphore";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import { logger } from "src/Lib/Logger";
import ILoadUserWorldsUseCase from "./ILoadUserWorldsUseCase";
import type IUIPort from "src/Components/Core/Application/Ports/Interfaces/IUIPort";

type AvailableWorldsArray = {
  worldID: number;
  worldName: string;
}[];

@injectable()
export default class LoadUserWorldsUseCase implements ILoadUserWorldsUseCase {
  constructor(
    @inject(PORT_TYPES.IWorldPort)
    private worldPort: IWorldPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter)
    private backendAdapter: IBackendAdapter,
    @inject(PORT_TYPES.IUIPort)
    private uiPort: IUIPort
  ) {}

  private semaphore = new Semaphore("LoadUserWorlds in Use", 1);

  async executeAsync(): Promise<void> {
    const lock = await this.semaphore.acquire();

    const userEntities =
      this.container.getEntitiesOfType<UserDataEntity>(UserDataEntity);

    if (userEntities.length === 0 || userEntities[0]?.isLoggedIn === false) {
      this.uiPort.displayNotification("User is not logged in!", "error");
      logger.error("User is not logged in!");
      return Promise.reject("User is not logged in");
    }

    let loadedAvailableWorlds: AvailableWorldsArray;
    if (userEntities[0].availableWorlds.length === 0) {
      loadedAvailableWorlds = await this.loadAvailableWorlds(
        userEntities[0].userToken
      );
      userEntities[0].availableWorlds = loadedAvailableWorlds;

      this.worldPort.onUserWorldsLoaded({ worldInfo: loadedAvailableWorlds });
    } else {
      this.worldPort.onUserWorldsLoaded({
        worldInfo: userEntities[0].availableWorlds,
      });
    }

    lock.release();
  }

  private async loadAvailableWorlds(
    userToken: string
  ): Promise<AvailableWorldsArray> {
    const coursesList = await this.backendAdapter.getCoursesAvailableForUser(
      userToken
    );

    const availableWorlds: AvailableWorldsArray = coursesList.courses.map(
      (course) => {
        return {
          worldID: course.courseID,
          worldName: course.courseName,
        };
      }
    );

    return availableWorlds;
  }
}
