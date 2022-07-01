import { injectable } from "inversify";
import LogUserIntoMoodleUseCase from "../../../Core/Application/LogUserIntoMoodle/LogUserIntoMoodleUseCase";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../Core/DependencyInjection/UseCases/USECASE_SYMBOLS";
import UserDataEntity from "../../../Core/Domain/Entities/UserData";
import EntityContainer from "../../../Core/Domain/EntityContainer/EntityContainer";
import DebugPort from "../../../Core/Ports/DebugPort/DebugPort";
import IMoodlePort from "../../../Core/Ports/MoodlePort/IMoodlePort";
import MoodlePort from "../../../Core/Ports/MoodlePort/MoodlePort";

@injectable()
//@ts-ignore
class BackendMock implements IBackend {
  async logInUser(username: string, password: string): Promise<string> {
    return "token";
  }
}

const createEntityMock = jest.spyOn(EntityContainer.prototype, "createEntity");

@injectable()
//@ts-ignore
class MoodlePortMock implements IMoodlePort {
  registerMoodleLoginPresenter = jest.fn();
  registerMoodleLoginButtonPresenter = jest.fn();
  displayLoginForm = jest.fn();
  loginSuccessful = jest.fn();
  debug_DisplayUserToken = jest.fn();
}

@injectable()
//@ts-ignore
class DebugPortMock implements IDebugPort {
  registerDebugPanelPresenter = jest.fn();
  setUserToken = jest.fn();
}

describe("LogUserIntoMoodleUseCase", () => {
  let useCase: LogUserIntoMoodleUseCase;

  beforeAll(() => {
    CoreDIContainer.unbind(PORT_TYPES.IMoodlePort);
    CoreDIContainer.bind(PORT_TYPES.IMoodlePort).to(MoodlePortMock);

    CoreDIContainer.unbind(PORT_TYPES.IDebugPort);
    CoreDIContainer.bind(PORT_TYPES.IDebugPort).to(DebugPortMock);
  });

  afterAll(() => {
    CoreDIContainer.unbind(PORT_TYPES.IMoodlePort);
    CoreDIContainer.bind(PORT_TYPES.IMoodlePort).to(MoodlePort);

    CoreDIContainer.unbind(PORT_TYPES.IDebugPort);
    CoreDIContainer.bind(PORT_TYPES.IDebugPort).to(DebugPort);
  });

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

  test("executeAsync calls the backend and stores correct user data in Enity", async () => {
    BackendMock.prototype.logInUser = jest
      .fn()
      .mockImplementation((username: string, password: string) =>
        Promise.resolve("token")
      );

    await useCase.executeAsync({
      username: "username",
      password: "password",
    });

    expect(BackendMock.prototype.logInUser).toHaveBeenCalledWith({
      username: "username",
      password: "password",
    });

    expect(createEntityMock).toHaveBeenCalledWith(
      {
        userToken: "token",
        username: "username",
        isLoggedIn: true,
      },
      UserDataEntity
    );
  });
});
