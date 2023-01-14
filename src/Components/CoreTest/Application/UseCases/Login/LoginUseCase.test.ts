import LoginUseCase from "../../../../Core/Application/UseCases/Login/LoginUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";
import ILMSPort from "../../../../Core/Ports/LMSPort/ILMSPort";
import { mock } from "jest-mock-extended";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import IUIPort from "../../../../Core/Ports/UIPort/IUIPort";
import IBackendAdapter from "../../../../Core/Adapters/BackendAdapter/IBackendAdapter";

const entityContainerMock = mock<IEntityContainer>();
const backendMock = mock<IBackendAdapter>();
const lmsPortMock = mock<ILMSPort>();
const uiPortMock = mock<IUIPort>();

describe("LoginUseCase", () => {
  let systemUnderTest: LoginUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<ILMSPort>(PORT_TYPES.ILMSPort).toConstantValue(
      lmsPortMock
    );
    CoreDIContainer.rebind<IBackendAdapter>(
      CORE_TYPES.IBackendAdapter
    ).toConstantValue(backendMock);
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind<IUIPort>(PORT_TYPES.IUIPort).toConstantValue(
      uiPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoginUseCase);
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

    expect(uiPortMock.displayNotification).toHaveBeenCalledWith(
      expect.any(String),
      "error"
    );

    uiPortMock.displayNotification.mockReset();
  });

  test("executeAsync calls the backend and stores correct user data in Enity", async () => {
    backendMock.loginUser.mockResolvedValue("token");
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);

    await systemUnderTest.executeAsync({
      username: "username",
      password: "password",
    });

    expect(backendMock.loginUser).toHaveBeenCalledWith({
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

    expect(lmsPortMock.onLoginSuccessful).toHaveBeenCalled();
  });

  test("Throws and displays error, if wrong userData is sent to the Backend", async () => {
    backendMock.loginUser.mockRejectedValue("error");
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);

    const badCall = async () => {
      await systemUnderTest.executeAsync({
        username: "username",
        password: "password",
      });
    };

    badCall().catch((error) => {
      expect(error).toBe("Wrong Password oder Username");
      expect(uiPortMock.displayNotification).toHaveBeenCalledWith(
        expect.any(String),
        "error"
      );
    });
  });
});
