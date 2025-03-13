import { inject, injectable } from "inversify";
import UserDataEntity from "src/Components/Core/Domain/Entities/UserDataEntity";
import type IEntityContainer from "src/Components/Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import UserLocationTO from "../../DataTransferObjects/UserLocationTO";
import IGetUserLocationUseCase from "./IGetUserLocationUseCase";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import type INotificationPort from "../../Ports/Interfaces/INotificationPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { NotificationMessages } from "src/Components/Core/Domain/Types/NotificationMessages";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type { IInternalGetLoginStatusUseCase } from "../GetLoginStatus/IGetLoginStatusUseCase";

@injectable()
export default class GetUserLocationUseCase implements IGetUserLocationUseCase {
  constructor(
    @inject(CORE_TYPES.ILogger)
    private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private entityContainer: IEntityContainer,
    @inject(PORT_TYPES.INotificationPort)
    private notificationPort: INotificationPort,
    @inject(USECASE_TYPES.IGetLoginStatusUseCase)
    private getLoginStatusUseCase: IInternalGetLoginStatusUseCase,
  ) {}

  execute(): UserLocationTO {
    let userLoggedIn = this.getLoginStatusUseCase.internalExecute().isLoggedIn;
    // let userDataEntity =
    //   this.entityContainer.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0];
    if (!userLoggedIn) {
      this.notificationPort.onNotificationTriggered(
        LogLevelTypes.ERROR,
        `GetUserLocationUseCase: User is not logged in!`,
        NotificationMessages.USER_NOT_LOGGED_IN,
      );
      return {
        worldID: undefined,
        spaceID: undefined,
      };
    }
    let userDataEntity =
      this.entityContainer.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0];
    if (userDataEntity.currentWorldID === undefined) {
      this.logger.log(
        LogLevelTypes.WARN,
        "GetUserLocationUseCase: User is not in a world while trying to get location.",
      );
      return {
        worldID: undefined,
        spaceID: undefined,
      };
    }
    this.logger.log(
      LogLevelTypes.TRACE,
      `GetUserLocationUseCase: User is in Location: World: ${userDataEntity.currentWorldID}, Space: ${userDataEntity.currentSpaceID}.`,
    );
    return {
      worldID: userDataEntity.currentWorldID,
      spaceID: userDataEntity.currentSpaceID,
    };
  }
}
