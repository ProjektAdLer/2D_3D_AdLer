import { inject, injectable } from "inversify";
import ISaveAvatarConfigUseCase from "./ISaveAvatarConfigUseCase";
import AvatarConfigTO from "../../DataTransferObjects/AvatarConfigTO";
import BackendAdapterUtils from "src/Components/Core/Adapters/BackendAdapter/BackendAdapterUtils";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import type IBackendPort from "../../Ports/Interfaces/IBackendPort";

@injectable()
export default class SaveAvatarConfigUseCase
  implements ISaveAvatarConfigUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
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

    // load avatar config if not already loaded
    if (!userDataEntities[0].avatar) return;

    const backendAvatarConfigTO =
      BackendAdapterUtils.convertAvatarConfigToBackendAvatarConfig(
        userDataEntities[0].avatar as AvatarConfigTO,
      );

    console.log("UPDATE AVATAR CONFIG: ", backendAvatarConfigTO);

    //Post new (complete) avatar config to backend
    const result = await this.backend.updateAvatarConfig(
      userDataEntities[0].userToken,
      backendAvatarConfigTO,
    );

    if (result) {
      this.logger.log(
        LogLevelTypes.TRACE,
        `SaveAvatarConfigUseCase: Avatar config saved. ${JSON.stringify(userDataEntities[0].avatar)}`,
      );
    }
  }
}
