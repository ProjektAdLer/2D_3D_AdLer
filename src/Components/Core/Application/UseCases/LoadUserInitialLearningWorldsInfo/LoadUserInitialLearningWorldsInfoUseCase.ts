import { inject, injectable } from "inversify";
import type IBackendPort from "src/Components/Core/Application/Ports/Interfaces/IBackendPort";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import type ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { Semaphore } from "src/Lib/Semaphore";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import ILoadUserInitialLearningWorldsInfoUseCase from "./ILoadUserInitialLearningWorldsInfoUseCase";
import type INotificationPort from "src/Components/Core/Application/Ports/Interfaces/INotificationPort";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import UserInitialLearningWorldsInfoTO from "../../DataTransferObjects/UserInitialLearningWorldsInfoTO";

type AvailableLearningWorldsArray = {
  worldID: number;
  worldName: string;
}[];

@injectable()
export default class LoadUserInitialLearningWorldsInfoUseCase
  implements ILoadUserInitialLearningWorldsInfoUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(PORT_TYPES.ILearningWorldPort)
    private worldPort: ILearningWorldPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter)
    private backendAdapter: IBackendPort,
    @inject(PORT_TYPES.INotificationPort)
    private notificationPort: INotificationPort
  ) {}

  private semaphore = new Semaphore("LoadUserWorlds in Use", 1);
  async internalExecuteAsync(): Promise<UserInitialLearningWorldsInfoTO> {
    const loadedWorlds = await this.loadInitialWorldsInfo();
    return loadedWorlds;
  }
  async executeAsync(): Promise<void> {
    const loadedWorlds = await this.loadInitialWorldsInfo();
    this.worldPort.onUserInitialLearningWorldsInfoLoaded(loadedWorlds);
  }
  async loadInitialWorldsInfo(): Promise<UserInitialLearningWorldsInfoTO> {
    const lock = await this.semaphore.acquire();

    const userEntities =
      this.container.getEntitiesOfType<UserDataEntity>(UserDataEntity);

    if (userEntities.length === 0 || userEntities[0]?.isLoggedIn === false) {
      this.notificationPort.displayNotification(
        "User is not logged in!",
        "error"
      );
      this.logger.log(
        LogLevelTypes.ERROR,
        "LoadUserInitialLearningWorldsInfoUseCase: User is not logged in!"
      );
      lock.release();
      return Promise.reject("User is not logged in");
    }

    let loadedAvailableWorlds: AvailableLearningWorldsArray;
    if (userEntities[0].availableWorlds.length === 0) {
      loadedAvailableWorlds = await this.loadAvailableLearningWorlds(
        userEntities[0].userToken
      );
      userEntities[0].availableWorlds = loadedAvailableWorlds;
      this.logger.log(
        LogLevelTypes.TRACE,
        "LoadUserInitialLearningWorldsInfoUseCase: Loaded available worlds from backend."
      );
      lock.release();
      return { worldInfo: loadedAvailableWorlds };
    } else {
      this.logger.log(
        LogLevelTypes.TRACE,
        "LoadUserInitialLearningWorldsInfoUseCase: Loaded available worlds from cache."
      );
      const worlds = { worldInfo: userEntities[0].availableWorlds };
      lock.release();
      return worlds;
    }
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
