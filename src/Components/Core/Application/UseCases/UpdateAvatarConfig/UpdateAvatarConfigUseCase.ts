import { inject, injectable } from "inversify";
import IUpdateAvatarConfigUseCase from "./IUpdateAvatarConfigUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import AvatarConfigTO from "../../DataTransferObjects/AvatarConfigTO";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type IAvatarPort from "../../Ports/Interfaces/IAvatarPort";
import AvatarEntity from "src/Components/Core/Domain/Entities/AvatarEntity";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

@injectable()
export default class UpdateAvatarConfigUseCase
  implements IUpdateAvatarConfigUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(PORT_TYPES.IAvatarPort)
    private avatarPort: IAvatarPort,
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
  ) {}

  execute(newAvatarConfig: Partial<AvatarConfigTO>): void {
    let userDataEntities =
      this.entityContainer.getEntitiesOfType(UserDataEntity);
    if (userDataEntities.length === 0) {
      this.logger.log(LogLevelTypes.ERROR, "No user data entity found");
      return;
    } else if (userDataEntities.length > 1) {
      this.logger.log(LogLevelTypes.ERROR, "Multiple user data entities found");
      return;
    }

    // TODO: this is a workaround when no config is available, remove when loading initial avatar config is implemented
    if (!userDataEntities[0].avatar) {
      userDataEntities[0].avatar = Object.assign(
        new AvatarEntity(),
        newAvatarConfig,
      );
      this.avatarPort.onAvatarConfigChanged(
        Object.assign({}, userDataEntities[0].avatar), // clone to prevent changes to propagate
        newAvatarConfig,
      );
    }

    // compute difference between new and current avatar config
    let difference: any = {}; // actually Partial<AvatarConfigTO>, but TS doesn't like that
    for (const key in newAvatarConfig) {
      const typedKey = key as keyof AvatarConfigTO;
      if (newAvatarConfig[typedKey] !== userDataEntities[0].avatar[typedKey])
        difference[typedKey] = newAvatarConfig[typedKey];
    }

    // skip update if no actual changes
    if (Object.keys(difference).length === 0) return;

    // apply new config to avatar entity
    userDataEntities[0].avatar = Object.assign(
      userDataEntities[0].avatar,
      newAvatarConfig,
    );

    this.avatarPort.onAvatarConfigChanged(
      Object.assign({}, userDataEntities[0].avatar), // clone to prevent changes to propagate
      difference as Partial<AvatarConfigTO>,
    );
  }
}
