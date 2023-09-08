import { inject, injectable } from "inversify";
import type IBackendPort from "../../Ports/Interfaces/IBackendPort";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import UserDataEntity from "../../../Domain/Entities/UserDataEntity";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import type ILMSPort from "../../Ports/Interfaces/ILMSPort";
import type INotificationPort from "../../Ports/Interfaces/INotificationPort";
import ILoginUseCase from "./ILoginUseCase";
import type ILoggerPort from "../../Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

@injectable()
export default class LoginUseCase implements ILoginUseCase {
  constructor(
    @inject(CORE_TYPES.ILogger) private logger: ILoggerPort,
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter) private backendAdapter: IBackendPort,
    @inject(PORT_TYPES.ILMSPort) private lmsPort: ILMSPort,
    @inject(PORT_TYPES.INotificationPort)
    private notificationPort: INotificationPort
  ) {}
  async executeAsync(data: {
    username: string;
    password: string;
  }): Promise<void> {
    if (
      this.container.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0]
        ?.isLoggedIn
    ) {
      this.logger.log(
        LogLevelTypes.ERROR,
        "LoginUseCase: User tried logging into Moodle while already logged in"
      );
      this.notificationPort.displayNotification(
        "You are already logged in to Moodle",
        "error"
      );
      return Promise.reject("User is already logged in");
    }
    let userToken: string;

    try {
      userToken = await this.backendAdapter.loginUser({
        username: data.username,
        password: data.password,
      });
    } catch (error) {
      this.logger.log(
        LogLevelTypes.WARN,
        "LoginUseCase: User tried logging in with wrong Info: " + error
      );
      this.notificationPort.displayNotification("Falsche Daten!", "error");
      return Promise.reject("Wrong Password oder Username");
    }

    this.container.useSingletonEntity<UserDataEntity>(
      {
        isLoggedIn: true,
        username: data.username,
        userToken: userToken,
      },
      UserDataEntity
    );

    this.logger.log(
      LogLevelTypes.INFO,
      "LoginUseCase: User logged in successfully"
    );
    this.lmsPort.onLoginSuccessful();

    return Promise.resolve();
  }
}
