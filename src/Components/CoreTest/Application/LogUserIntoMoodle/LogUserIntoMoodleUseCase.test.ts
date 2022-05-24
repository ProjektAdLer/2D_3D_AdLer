import { injectable } from "inversify";
import LogUserIntoMoodleUseCase from "../../../Core/Application/LogUserIntoMoodle/LogUserIntoMoodleUseCase";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../Core/DependencyInjection/UseCases/USECASE_SYMBOLS";
import UserDataEntity from "../../../Core/Domain/Entities/UserData";
import EntityContainer from "../../../Core/Domain/EntityContainer/EntityContainer";
import MoodlePort from "../../../Core/Presentation/Ports/MoodlePort/MoodlePort";

@injectable()
//@ts-ignore
class BackendMock implements IBackend {
  async logInUser(username: string, password: string): Promise<string> {
    return "token";
  }
}

const createEntityMock = jest.spyOn(EntityContainer.prototype, "createEntity");
const debug_DisplayUserTokenMock = jest.spyOn(
  MoodlePort.prototype,
  "debug_DisplayUserToken"
);

describe("LogUserIntoMoodleUseCase", () => {
  let useCase: LogUserIntoMoodleUseCase;

  beforeEach(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.unbind(CORE_TYPES.IBackend);
    CoreDIContainer.bind(CORE_TYPES.IBackend).to(BackendMock);

    useCase = CoreDIContainer.get<LogUserIntoMoodleUseCase>(
      USECASE_TYPES.ILogUserIntoMoodleUseCase
    );
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  test("executeAsync calls the backend", async () => {
    BackendMock.prototype.logInUser = jest
      .fn()
      .mockImplementation((username: string, password: string) =>
        Promise.resolve("token")
      );

    await useCase.executeAsync({
      username: "username",
      password: "password",
    });

    expect(BackendMock.prototype.logInUser).toHaveBeenCalledWith(
      "username",
      "password"
    );
    expect(createEntityMock).toHaveBeenCalledWith(
      {
        userToken: "token",
        username: "username",
        password: "password",
        isLoggedIn: true,
      },
      UserDataEntity
    );
  });
});
