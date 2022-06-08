import { inject, injectable } from "inversify";
import type IBackend from "../../Adapters/Backend/IBackend";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";
import PORT_TYPES from "../../DependencyInjection/Ports/PORT_TYPES";
import UserDataEntity from "../../Domain/Entities/UserData";
import type IEntityContainer from "../../Domain/EntityContainer/IEntityContainer";
import IMoodlePort from "../../Ports/MoodlePort/IMoodlePort";
import ILogUserIntoMoodleUseCase from "./ILogUserIntoMoodleUseCase";

@injectable()
export default class LogUserIntoMoodleUseCase
  implements ILogUserIntoMoodleUseCase
{
  constructor(
    @inject(CORE_TYPES.IEntityContainer)
    private container: IEntityContainer,
    @inject(CORE_TYPES.IBackend) private backend: IBackend,
    @inject(PORT_TYPES.IMoodlePort) private moodlePort: IMoodlePort
  ) {}
  async executeAsync(data: {
    username: string;
    password: string;
  }): Promise<void> {
    const userToken = await this.backend.logInUser({
      username: data.username,
      password: data.password,
    });
    console.log(
      `Logging user ${data.username} into moodle with Token: ${userToken}`
    );

    this.container.createEntity<UserDataEntity>(
      {
        isLoggedIn: true,
        username: data.username,
        password: data.password,
        userToken: userToken,
      },
      UserDataEntity
    );

    this.moodlePort.debug_DisplayUserToken(userToken);

    return Promise.resolve();
  }
}
