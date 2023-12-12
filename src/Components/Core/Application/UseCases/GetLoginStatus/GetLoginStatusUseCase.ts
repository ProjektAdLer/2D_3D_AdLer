import { inject, injectable } from "inversify";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import IGetLoginStatusUseCase from "./IGetLoginStatusUseCase";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import LoginStatusTO from "../../DataTransferObjects/LoginStatusTO";
@injectable()
export default class GetLoginStatusUseCase implements IGetLoginStatusUseCase {
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer
  ) {}

  execute(): LoginStatusTO {
    // TODO: change this when multiple users are supported
    const userDataEntity =
      this.container.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0];

    if (!userDataEntity) throw new Error("No UserDataEntity found.");

    this.logger.log(
      LogLevelTypes.TRACE,
      `GetLoginStatusUseCase: Checked LoginStatus: ${userDataEntity?.isLoggedIn}.`
    );
    return {
      isLoggedIn: userDataEntity.isLoggedIn,
      userName: userDataEntity.username,
    };
  }
}
