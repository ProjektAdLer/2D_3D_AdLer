import { inject, injectable } from "inversify";
import type IBackend from "../../Adapters/Backend/IBackend";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../DependencyInjection/Ports/PORT_TYPES";
import UserDataEntity from "../../Domain/Entities/UserDataEntity";
import type IEntityContainer from "../../Domain/EntityContainer/IEntityContainer";
import type IDebugPort from "../../Ports/DebugPort/IDebugPort";
import type IMoodlePort from "../../Ports/MoodlePort/IMoodlePort";
import type IUIPort from "../../Ports/UIPort/IUIPort";
import ILogUserIntoMoodleUseCase from "./ILogUserIntoMoodleUseCase";

@injectable()
export default class LogUserIntoMoodleUseCase
  implements ILogUserIntoMoodleUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(CORE_TYPES.IBackend) private backend: IBackend,
    @inject(PORT_TYPES.IMoodlePort) private moodlePort: IMoodlePort,
    @inject(PORT_TYPES.IUIPort) private uiPort: IUIPort,
    @inject(PORT_TYPES.IDebugPort) private debugPort: IDebugPort
  ) {}
  async executeAsync(data: {
    username: string;
    password: string;
  }): Promise<void> {
    if (
      this.container.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0]
        ?.isLoggedIn
    ) {
      this.uiPort.displayModal("You are already logged in to Moodle", "error");
      return Promise.reject("User is already logged in");
    }

    const userToken = await this.backend.logInUser({
      username: data.username,
      password: data.password,
    });

    if (userToken === "Falsche Daten!") {
      this.uiPort.displayModal("Falsche Daten!", "error");
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

    this.moodlePort.debug_DisplayUserToken(userToken);

    this.moodlePort.loginSuccessful();

    this.debugPort.setUserToken(userToken);

    return Promise.resolve();
  }
}
