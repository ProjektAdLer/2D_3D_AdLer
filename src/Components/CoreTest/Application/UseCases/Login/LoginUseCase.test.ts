import LoginUseCase from "../../../../Core/Application/UseCases/Login/LoginUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";
import { mock } from "jest-mock-extended";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import IBackendPort from "../../../../Core/Application/Ports/Interfaces/IBackendPort";
import ILMSPort from "../../../../Core/Application/Ports/Interfaces/ILMSPort";
import INotificationPort from "../../../../Core/Application/Ports/Interfaces/INotificationPort";
import i18next from "i18next";
import { AxiosError } from "axios";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";

const entityContainerMock = mock<IEntityContainer>();
const backendMock = mock<IBackendPort>();
const lmsPortMock = mock<ILMSPort>();
const notificationPortMock = mock<INotificationPort>();

describe("LoginUseCase", () => {
  let systemUnderTest: LoginUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<ILMSPort>(PORT_TYPES.ILMSPort).toConstantValue(
      lmsPortMock,
    );
    CoreDIContainer.rebind<IBackendPort>(
      CORE_TYPES.IBackendAdapter,
    ).toConstantValue(backendMock);
    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer,
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind<INotificationPort>(
      PORT_TYPES.INotificationPort,
    ).toConstantValue(notificationPortMock);
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

    await systemUnderTest.executeAsync({
      username: "test",
      password: "test",
    });

    expect(lmsPortMock.onLoginFailure).toHaveBeenCalled();
    expect(lmsPortMock.onLoginFailure).toHaveBeenCalledWith(
      i18next.t("alreadyLoggedIn", { ns: "start" }),
      "",
    );

    expect(notificationPortMock.onNotificationTriggered).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      expect.any(String),
      "User is already logged in!",
    );

    notificationPortMock.onNotificationTriggered.mockReset();
  });

  // ANF-ID: [EZZ0001]
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
      UserDataEntity,
    );

    expect(lmsPortMock.onLoginSuccessful).toHaveBeenCalled();
  });

  // ANF-ID: [EZZ0003]
  test("executeAsync calls onLoginSuccess on lms port", async () => {
    backendMock.loginUser.mockResolvedValue("token");
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);

    await systemUnderTest.executeAsync({
      username: "username",
      password: "password",
    });

    expect(lmsPortMock.onLoginSuccessful).toHaveBeenCalled();
  });

  // ANF-ID: [EZZ0005]
  test("Throws and displays error, if wrong userData is sent to the Backend", async () => {
    backendMock.loginUser.mockRejectedValue("error");
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);

    await systemUnderTest.executeAsync({
      username: "username",
      password: "password",
    });

    expect(lmsPortMock.onLoginFailure).toHaveBeenCalled();
    expect(lmsPortMock.onLoginFailure).toHaveBeenCalledWith(
      i18next.t("loginFail", { ns: "start" }),
      i18next.t("loginFailAdvise"),
    );
  });

  // ANF-ID: [EZZ0004]
  test("Throws and displays error, if server timeout is reached", async () => {
    let error = new AxiosError();
    error.code = "ECONNABORTED";
    backendMock.loginUser.mockRejectedValue(error);
    entityContainerMock.getEntitiesOfType.mockReturnValue([]);

    await systemUnderTest.executeAsync({
      username: "username",
      password: "password",
    });

    expect(lmsPortMock.onLoginFailure).toHaveBeenCalled();
    expect(lmsPortMock.onLoginFailure).toHaveBeenCalledWith(
      i18next.t("loginFail", { ns: "start" }) +
        " " +
        i18next.t("serverTimeOut"),
      i18next.t("loginRetry"),
    );
  });
});
