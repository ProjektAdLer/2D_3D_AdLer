import { inject, injectable } from "inversify";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import IGetLoginStatusUseCase from "./IGetLoginStatusUseCase";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import LoginStatusTO from "../../DataTransferObjects/LoginStatusTO";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type INotificationPort from "../../Ports/Interfaces/INotificationPort";
@injectable()
export default class GetLoginStatusUseCase implements IGetLoginStatusUseCase {
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(PORT_TYPES.INotificationPort)
    private notificationPort: INotificationPort
  ) {}

  internalExecute(): LoginStatusTO {
    const userDataEntity =
      this.container.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0];
    if (!userDataEntity?.isLoggedIn) {
      this.notificationPort.displayNotification(
        "User is not logged in!",
        "error"
      );
      this.logger.log(
        LogLevelTypes.ERROR,
        `InternalGetLoginStatusUseCase: Checked LoginStatus: ${userDataEntity?.isLoggedIn}. User is not logged in!`
      );
    } else {
      this.logger.log(
        LogLevelTypes.TRACE,
        `InternalGetLoginStatusUseCase: Checked LoginStatus: ${userDataEntity?.isLoggedIn}.`
      );
    }
    return {
      isLoggedIn: userDataEntity?.isLoggedIn ?? false,
      userName: userDataEntity?.username ?? undefined,
    };
  }
  execute(): LoginStatusTO {
    const userDataEntity =
      this.container.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0];

    this.logger.log(
      LogLevelTypes.TRACE,
      `GetLoginStatusUseCase: Checked LoginStatus: ${userDataEntity?.isLoggedIn}.`
    );
    return {
      isLoggedIn: userDataEntity?.isLoggedIn ?? false,
      userName: userDataEntity?.username ?? undefined,
    };
  }
}
