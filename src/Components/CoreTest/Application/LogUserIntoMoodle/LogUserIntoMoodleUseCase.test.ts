import LogUserIntoMoodleUseCase from "../../../Core/Application/LogUserIntoMoodle/LogUserIntoMoodleUseCase";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../Core/DependencyInjection/Ports/PORT_TYPES";
import UserDataEntity from "../../../Core/Domain/Entities/UserDataEntity";
import IMoodlePort from "../../../Core/Ports/MoodlePort/IMoodlePort";
import { mock } from "jest-mock-extended";
import IBackend from "../../../Core/Adapters/Backend/IBackend";
import IDebugPort from "../../../Core/Ports/DebugPort/IDebugPort";
import IEntityContainer from "../../../Core/Domain/EntityContainer/IEntityContainer";
import IUIPort from "../../../Core/Ports/UIPort/IUIPort";

const entityContainerMock = mock<IEntityContainer>();
const backendMock = mock<IBackend>();
const debugPortMock = mock<IDebugPort>();
const moodlePortMock = mock<IMoodlePort>();
const uiPortMock = mock<IUIPort>();

describe("LogUserIntoMoodleUseCase", () => {
  let useCase: LogUserIntoMoodleUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.unbind(PORT_TYPES.IMoodlePort);
    CoreDIContainer.bind(PORT_TYPES.IMoodlePort).toConstantValue(
      moodlePortMock
    );

    CoreDIContainer.unbind(PORT_TYPES.IDebugPort);
    CoreDIContainer.bind(PORT_TYPES.IDebugPort).toConstantValue(debugPortMock);

    CoreDIContainer.unbind(CORE_TYPES.IBackend);
    CoreDIContainer.bind(CORE_TYPES.IBackend).toConstantValue(backendMock);

    CoreDIContainer.unbind(CORE_TYPES.IEntityContainer);
    CoreDIContainer.bind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );

    CoreDIContainer.unbind(PORT_TYPES.IUIPort);
    CoreDIContainer.bind(PORT_TYPES.IUIPort).toConstantValue(uiPortMock);
  });

  beforeEach(() => {
    useCase = CoreDIContainer.resolve(LogUserIntoMoodleUseCase);
  });
  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("throws, if user is already logged in", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        isLoggedIn: true,
      },
    ]);

    const badCall = async () => {
      await useCase.executeAsync({
        username: "test",
        password: "test",
      });
    };

    await badCall().catch((error) => {
      expect(error).toBe("User is already logged in");
    });

    expect(uiPortMock.displayModal).toHaveBeenCalledWith(
      expect.any(String),
      "error"
    );

    uiPortMock.displayModal.mockReset();
  });

  test("executeAsync calls the backend and stores correct user data in Enity", async () => {
    backendMock.logInUser.mockResolvedValue("token");
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);

    await useCase.executeAsync({
      username: "username",
      password: "password",
    });

    expect(backendMock.logInUser).toHaveBeenCalledWith({
      username: "username",
      password: "password",
    });

    expect(entityContainerMock.useSingletonEntity).toHaveBeenCalledWith(
      {
        userToken: "token",
        username: "username",
        isLoggedIn: true,
      },
      UserDataEntity
    );

    expect(moodlePortMock.loginSuccessful).toHaveBeenCalled();
  });

  test("Throws, if wrong userData is sent to the Backend", async () => {
    backendMock.logInUser.mockResolvedValue("Falsche Daten!");
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);

    const badCall = async () => {
      await useCase.executeAsync({
        username: "username",
        password: "password",
      });
    };

    badCall().catch((error) => {
      expect(error).toBe("Wrong Password oder Username");
    });
  });
});
