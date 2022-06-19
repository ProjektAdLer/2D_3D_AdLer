import { inject, injectable } from "inversify";
import type IBackend from "../../Adapters/Backend/IBackend";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../DependencyInjection/Ports/PORT_TYPES";
import UserDataEntity from "../../Domain/Entities/UserData";
import type IEntityContainer from "../../Domain/EntityContainer/IEntityContainer";
import type IErrorPort from "../../Ports/ErrorPort/IErrorPort";
import type IMoodlePort from "../../Ports/MoodlePort/IMoodlePort";
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
    @inject(PORT_TYPES.IErrorPort) private errorPort: IErrorPort
  ) {}
  async executeAsync(data: {
    username: string;
    password: string;
  }): Promise<void> {
    if (
      this.container.getEntitiesOfType<UserDataEntity>(UserDataEntity)[0]
        ?.isLoggedIn
    ) {
      return Promise.reject("User is already logged in");
    }

    const userToken = await this.backend.logInUser({
      username: data.username,
      password: data.password,
    });

    if (userToken === "Falsche Daten!") {
      this.errorPort.displayErrorModal("Falsche Daten!");
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

    return Promise.resolve();
  }
}
