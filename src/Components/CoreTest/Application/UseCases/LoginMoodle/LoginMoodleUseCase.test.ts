import LoginMoodleUseCase from "../../../../Core/Application/UseCases/LoginMoodle/LoginMoodleUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";
import IMoodlePort from "../../../../Core/Ports/MoodlePort/IMoodlePort";
import { mock } from "jest-mock-extended";
import IDebugPort from "../../../../Core/Ports/DebugPort/IDebugPort";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import IUIPort from "../../../../Core/Ports/UIPort/IUIPort";
import IBackendAdapter from "../../../../Core/Adapters/BackendAdapter/IBackendAdapter";

const entityContainerMock = mock<IEntityContainer>();
const backendMock = mock<IBackendAdapter>();
const debugPortMock = mock<IDebugPort>();
const moodlePortMock = mock<IMoodlePort>();
const uiPortMock = mock<IUIPort>();

describe("LoginMoodleUseCase", () => {
  let systemUnderTest: LoginMoodleUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IMoodlePort>(PORT_TYPES.IMoodlePort).toConstantValue(
      moodlePortMock
    );
    CoreDIContainer.rebind<IBackendAdapter>(
      CORE_TYPES.IBackendAdapter
    ).toConstantValue(backendMock);
    CoreDIContainer.rebind<IDebugPort>(PORT_TYPES.IDebugPort).toConstantValue(
      debugPortMock
    );
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind<IUIPort>(PORT_TYPES.IUIPort).toConstantValue(
      uiPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoginMoodleUseCase);
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
      await systemUnderTest.executeAsync({
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

    await systemUnderTest.executeAsync({
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
      await systemUnderTest.executeAsync({
        username: "username",
        password: "password",
      });
    };

    badCall().catch((error) => {
      expect(error).toBe("Wrong Password oder Username");
    });
  });
});
