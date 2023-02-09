import { inject, injectable } from "inversify";
import type IBackendAdapter from "src/Components/Core/Adapters/BackendAdapter/IBackendAdapter";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import type IWorldPort from "src/Components/Core/Ports/WorldPort/IWorldPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { Semaphore } from "src/Lib/Semaphore";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import { logger } from "src/Lib/Logger";
import UserWorldsEntity from "src/Components/Core/Domain/Entities/UserWorldsEntity";
import ILoadUserWorldsUseCase from "./ILoadUserWorldsUseCase";

@injectable()
export default class LoadUserWorldsUseCase implements ILoadUserWorldsUseCase {
  constructor(
    @inject(PORT_TYPES.IWorldPort)
    private worldPort: IWorldPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter)
    private backendAdapter: IBackendAdapter
  ) {}

  private semaphore = new Semaphore("LoadUserWorlds in Use", 1);

  async executeAsync(): Promise<void> {
    const lock = await this.semaphore.acquire();

    const userData = this.container.getEntitiesOfType(UserDataEntity);

    if (userData.length === 0 || userData[0]?.isLoggedIn === false) {
      logger.error("User is not logged in!");
      return Promise.reject("User is not logged in");
    }

    let userWorldEntities = this.container.getEntitiesOfType(UserWorldsEntity);
    let userWorldsEntity = userWorldEntities[0];
    if (!userWorldsEntity) {
      userWorldsEntity = await this.load(userData[0]);
    }

    this.worldPort.onUserWorldsLoaded(userWorldsEntity);

    lock.release();
  }

  private async load(userData: UserDataEntity): Promise<UserWorldsEntity> {
    const coursesList = await this.backendAdapter.getCoursesAvailableForUser(
      userData.userToken
    );
    let worldCount = coursesList.courses.length;

    const userWorldsEntity = new UserWorldsEntity();
    userWorldsEntity.UserToken = userData.userToken;
    userWorldsEntity.worldInfo = [];
    for (let i = 0; i < worldCount; i++) {
      userWorldsEntity.worldInfo.push([
        coursesList.courses[i].courseId,
        coursesList.courses[i].courseName,
      ]);
    }

    return userWorldsEntity;
  }
}
