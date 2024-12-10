import { inject, injectable } from "inversify";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import type IAvatarPort from "../../Ports/Interfaces/IAvatarPort";
import ILoadAvatarConfigUseCase from "./ILoadAvatarConfigUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "../../../Domain/Types/LogLevelTypes";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import UserDataEntity from "../../../Domain/Entities/UserDataEntity";
import type IBackendPort from "../../Ports/Interfaces/IBackendPort";
import AvatarEntity from "src/Components/Core/Domain/Entities/AvatarEntity";

@injectable()
export default class LoadAvatarConfigUseCase
  implements ILoadAvatarConfigUseCase
{
  constructor(
    @inject(CORE_TYPES.ILogger) private logger: ILoggerPort,
    @inject(PORT_TYPES.IAvatarPort) private avatarPort: IAvatarPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter)
    private backend: IBackendPort,
  ) {}

  async executeAsync(): Promise<void> {
    let userDataEntities =
      this.entityContainer.getEntitiesOfType(UserDataEntity);
    if (userDataEntities.length === 0) {
      this.logger.log(LogLevelTypes.ERROR, "No user data entity found");
      return;
    } else if (userDataEntities.length > 1) {
      this.logger.log(LogLevelTypes.ERROR, "Multiple user data entities found");
      return;
    }

    // TODO: actually load avatar config from backend
    if (!userDataEntities[0].avatar) {
      userDataEntities[0].avatar = new AvatarEntity();
      // let avatarConfig = await this.backend.loadAvatarConfigAsync();
    }

    this.avatarPort.onAvatarConfigLoaded(
      Object.assign({}, userDataEntities[0].avatar),
    );
  }
}
