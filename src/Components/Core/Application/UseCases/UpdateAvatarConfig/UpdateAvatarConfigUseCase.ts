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

  execute(avatarConfig: Partial<AvatarConfigTO>): void {
    let userDataEntities =
      this.entityContainer.getEntitiesOfType(UserDataEntity);
    if (userDataEntities.length === 0) {
      this.logger.log(LogLevelTypes.ERROR, "No user data entity found");
      return;
    } else if (userDataEntities.length > 1) {
      this.logger.log(LogLevelTypes.ERROR, "Multiple user data entities found");
      return;
    }

    userDataEntities[0].avatar = Object.assign(
      userDataEntities[0].avatar ?? new AvatarEntity(),
      avatarConfig,
    );

    this.avatarPort.onAvatarConfigChanged(
      Object.assign({}, userDataEntities[0].avatar),
    );
  }
}
