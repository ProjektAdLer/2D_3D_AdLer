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
import BackendAdapterUtils from "src/Components/Core/Adapters/BackendAdapter/BackendAdapterUtils";
import AvatarConfigTO from "../../DataTransferObjects/AvatarConfigTO";

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

    // load avatar config from backend
    if (!userDataEntities[0].avatar) {
      const backendAvatarConfigTO = await this.backend.getAvatarConfig(
        userDataEntities[0].userToken,
      );
      const avatarConfigTO =
        BackendAdapterUtils.convertBackendAvatarConfigToAvatarConfig(
          backendAvatarConfigTO,
        );

      this.fillEmptyAttributes(avatarConfigTO);
      userDataEntities[0].avatar = avatarConfigTO;
    }

    this.avatarPort.onAvatarConfigLoaded(
      Object.assign({}, userDataEntities[0].avatar),
    );
  }

  private fillEmptyAttributes(config: AvatarConfigTO) {
    if (!config.hair) config.hair = "none";
    if (!config.beard) config.beard = "none";
    if (!config.headgear) config.headgear = "none";
    if (!config.glasses) config.glasses = "none";
    if (!config.backpack) config.backpack = "none";
    if (!config.other) config.other = "none";
    if (!config.shirt) config.shirt = "shirts-sweatshirt";
    if (!config.pants) config.pants = "pants-jeans";
    if (!config.shoes) config.shoes = "shoes-trainers";
    if (!config.roundness) config.roundness = 50;
  }
}
