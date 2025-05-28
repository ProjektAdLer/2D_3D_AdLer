import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import ILogoutUseCase from "./ILogoutUseCase";
import { inject, injectable } from "inversify";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import UserDataEntity from "../../../Domain/Entities/UserDataEntity";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "../../../Domain/Types/LogLevelTypes";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILMSPort from "../../Ports/Interfaces/ILMSPort";

@injectable()
export default class LogoutUseCase implements ILogoutUseCase {
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(CORE_TYPES.ILogger) private logger: ILoggerPort,
    @inject(PORT_TYPES.ILMSPort) private lmsPort: ILMSPort,
  ) {}

  execute(): void {
    const userEntity = this.entityContainer.getEntitiesOfType(UserDataEntity);
    if (userEntity.length <= 0) {
      return;
    }

    this.entityContainer.deleteAll();

    this.logger.log(
      LogLevelTypes.INFO,
      "LoginUseCase: User logged out successfully",
    );
    this.lmsPort.onLogoutSuccessful();
  }
}
