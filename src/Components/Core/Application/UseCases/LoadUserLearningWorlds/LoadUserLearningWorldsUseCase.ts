import { inject, injectable } from "inversify";
import type IBackendPort from "src/Components/Core/Application/Ports/Interfaces/IBackendPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import type ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { Semaphore } from "src/Lib/Semaphore";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import { logger } from "src/Lib/Logger";
import ILoadUserLearningWorldsUseCase from "./ILoadUserLearningWorldsUseCase";
import type IUIPort from "src/Components/Core/Application/Ports/Interfaces/IUIPort";

type AvailableLearningWorldsArray = {
  worldID: number;
  worldName: string;
}[];

@injectable()
export default class LoadUserLearningWorldsUseCase
  implements ILoadUserLearningWorldsUseCase
{
  constructor(
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter)
    private backendAdapter: IBackendPort,
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

    let loadedAvailableWorlds: AvailableLearningWorldsArray;
    if (userEntities[0].availableWorlds.length === 0) {
      loadedAvailableWorlds = await this.loadAvailableLearningWorlds(
        userEntities[0].userToken
      );
      userEntities[0].availableWorlds = loadedAvailableWorlds;

      this.worldPort.onUserLearningWorldsLoaded({
        worldInfo: loadedAvailableWorlds,
      });
    } else {
      this.worldPort.onUserLearningWorldsLoaded({
        worldInfo: userEntities[0].availableWorlds,
      });
    }

    lock.release();
  }

  private async loadAvailableLearningWorlds(
    userToken: string
  ): Promise<AvailableLearningWorldsArray> {
    const coursesList = await this.backendAdapter.getCoursesAvailableForUser(
      userToken
    );

    const availableLearningWorlds: AvailableLearningWorldsArray =
      coursesList.courses.map((course) => {
        return {
          worldID: course.courseID,
          worldName: course.courseName,
        };
      });

    return availableLearningWorlds;
  }
}