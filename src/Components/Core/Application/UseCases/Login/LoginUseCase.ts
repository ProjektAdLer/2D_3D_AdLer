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
import { AxiosError } from "axios";
import i18next from "i18next";

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
        LogLevelTypes.WARN,
        "LoginUseCase: User tried logging into Moodle while already logged in"
      );
      this.notificationPort.displayNotification(
        "You are already logged in to Moodle",
        "error"
      );
      this.lmsPort.onLoginFailure(
        i18next.t("alreadyLoggedIn", { ns: "start" }),
        ""
      );
      return Promise.resolve();
    }
    let userToken: string;

    try {
      userToken = await this.backendAdapter.loginUser({
        username: data.username,
        password: data.password,
      });
    } catch (error) {
      // server timeout
      if (error instanceof AxiosError && error.code === "ECONNABORTED") {
        this.logger.log(
          LogLevelTypes.WARN,
          "LoginUseCase: Connection timeout exceeded with error: " + error
        );
        this.notificationPort.displayNotification("Timeout", "error");
        this.lmsPort.onLoginFailure(
          i18next.t("loginFail", { ns: "start" }) +
            " " +
            i18next.t("serverTimeOut"),
          i18next.t("loginRetry")
        );
      } else {
        // wrong password or username
        this.logger.log(
          LogLevelTypes.WARN,
          "LoginUseCase: User tried logging in with wrong Info: " + error
        );
        this.notificationPort.displayNotification("Falsche Daten!", "error");
        this.lmsPort.onLoginFailure(
          i18next.t("loginFail", { ns: "start" }),
          i18next.t("loginFailAdvise")
        );
      }
      return Promise.resolve();
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
    this.lmsPort.onLoginSuccessful(data.username);

    return Promise.resolve();
  }
}
