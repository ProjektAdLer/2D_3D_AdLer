import { inject, injectable } from "inversify";
import type IBackendAdapter from "../../../Adapters/BackendAdapter/IBackendPort";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import UserDataEntity from "../../../Domain/Entities/UserDataEntity";
import type IEntityContainer from "../../../Domain/EntityContainer/IEntityContainer";
import type ILMSPort from "../../../Ports/LMSPort/ILMSPort";
import type IUIPort from "../../../Ports/UIPort/IUIPort";
import ILoginUseCase from "./ILoginUseCase";

@injectable()
export default class LoginUseCase implements ILoginUseCase {
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(CORE_TYPES.IBackendAdapter) private backendAdapter: IBackendAdapter,
    @inject(PORT_TYPES.ILMSPort) private lmsPort: ILMSPort,
    @inject(PORT_TYPES.IUIPort) private uiPort: IUIPort
  ) {}
  async executeAsync(data: {
    username: string;
    password: string;
  }): Promise<void> {
    if (
      this.container.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0]
        ?.isLoggedIn
    ) {
      this.uiPort.displayNotification(
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
      this.uiPort.displayNotification("Falsche Daten!", "error");
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

    this.lmsPort.onLoginSuccessful();

    return Promise.resolve();
  }
}
