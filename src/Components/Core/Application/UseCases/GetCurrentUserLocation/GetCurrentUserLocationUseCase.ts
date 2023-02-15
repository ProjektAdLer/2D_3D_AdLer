import { inject, injectable } from "inversify";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import UserLocationTO from "../../DataTransferObjects/UserLocationTO";
import IGetCurrentUserLocationUseCase from "./IGetCurrentUserLocationUseCase";

@injectable()
export default class GetCurrentUserLocationUseCase
  implements IGetCurrentUserLocationUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer
  ) {}

  execute(): UserLocationTO {
    let userDataEntity =
      this.entityContainer.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0];

    if (!userDataEntity || !userDataEntity.isLoggedIn) {
      throw new Error("User is not logged in, cannot get current location");
    }

    if (userDataEntity.currentWorldID === undefined)
      throw new Error("User is not in a world, cannot get current location");

    return {
      worldID: userDataEntity.currentWorldID,
      spaceID: userDataEntity.currentSpaceID,
    };
  }
}
