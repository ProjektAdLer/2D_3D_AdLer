import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import ILogoutUseCase from "./ILogoutUseCase";
import { inject, injectable } from "inversify";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import UserDataEntity from "../../../Domain/Entities/UserDataEntity";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "../../../Domain/Types/LogLevelTypes";

@injectable()
export default class LogoutUseCase implements ILogoutUseCase {
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(CORE_TYPES.ILogger) private logger: ILoggerPort
  ) {}

  execute(): void {
    const userEntity = this.entityContainer.getEntitiesOfType(UserDataEntity);
    if (userEntity.length <= 0) {
      throw new Error("No User logged in");
    }

    this.entityContainer.deleteEntity(userEntity[0]);

    this.logger.log(
      LogLevelTypes.INFO,
      "LoginUseCase: User logged out successfully"
    );
  }
}
