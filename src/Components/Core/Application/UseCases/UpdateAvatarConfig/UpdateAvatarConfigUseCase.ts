import { inject, injectable } from "inversify";
import IUpdateAvatarConfigUseCase from "./IUpdateAvatarConfigUseCase";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import AvatarConfigTO from "../../DataTransferObjects/AvatarConfigTO";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type IAvatarPort from "../../Ports/Interfaces/IAvatarPort";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type ILoadAvatarConfigUseCase from "../LoadAvatarConfig/ILoadAvatarConfigUseCase";
import type IBackendPort from "../../Ports/Interfaces/IBackendPort";

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
    @inject(USECASE_TYPES.ILoadAvatarConfigUseCase)
    private loadAvatarUseCase: ILoadAvatarConfigUseCase,
    @inject(CORE_TYPES.IBackendAdapter)
    private backend: IBackendPort,
  ) {}

  async executeAsync(newAvatarConfig: Partial<AvatarConfigTO>): Promise<void> {
    let userDataEntities =
      this.entityContainer.getEntitiesOfType(UserDataEntity);
    if (userDataEntities.length === 0) {
      this.logger.log(LogLevelTypes.ERROR, "No user data entity found");
      return;
    } else if (userDataEntities.length > 1) {
      this.logger.log(LogLevelTypes.ERROR, "Multiple user data entities found");
      return;
    }

    // load avatar config if not already loaded
    if (!userDataEntities[0].avatar)
      await this.loadAvatarUseCase.executeAsync();

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

    //Post new (complete) avatar config to backend
    this.backend.updateAvatarConfig(
      userDataEntities[0].userToken,
      userDataEntities[0].avatar,
    );

    this.logger.log(
      LogLevelTypes.TRACE,
      `UpdateAvatarConfigUseCase: Avatar config updated. ${JSON.stringify(difference)}`,
    );

    this.avatarPort.onAvatarConfigChanged(
      Object.assign({}, userDataEntities[0].avatar), // clone to prevent changes to propagate
      difference as Partial<AvatarConfigTO>,
    );
  }
}
