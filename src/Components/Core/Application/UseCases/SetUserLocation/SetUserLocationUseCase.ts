import { inject, injectable } from "inversify";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import { logger } from "src/Lib/Logger";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import ISetUserLocationUseCase from "./ISetUserLocationUseCase";

@injectable()
export default class SetUserLocationUseCase implements ISetUserLocationUseCase {
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer
  ) {}

  execute(data: { worldID: number; spaceID?: number }): void {
    let userDataEntity =
      this.entityContainer.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0];

    if (!userDataEntity || !userDataEntity.isLoggedIn) {
      logger.error("User is not logged in, cannot set current location");
      return;
    }

    userDataEntity.currentWorldID = data.worldID;
    if (data.spaceID) userDataEntity.currentSpaceID = data.spaceID;
  }
}
