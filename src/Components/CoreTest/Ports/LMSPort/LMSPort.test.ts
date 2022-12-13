import { mock } from "jest-mock-extended";
import LMSPort from "../../../Core/Ports/LMSPort/LMSPort";
import ILoginButtonPresenter from "../../../Core/Presentation/React/WelcomePage/LoginButton/ILoginButtonPresenter";
import ILoginModalPresenter from "../../../Core/Presentation/React/GeneralComponents/LoginModal/ILoginModalPresenter";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import { logger } from "../../../../Lib/Logger";
import IWorldMenuButtonPresenter from "../../../Core/Presentation/React/WelcomePage/WorldMenuButton/IWorldMenuButtonPresenter";

jest.mock("src/Lib/Logger");

describe("LMSPort", () => {
  let systemUnderTest: LMSPort;

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LMSPort);
  });

  test("displayLoginForm throws error if LoginModalPresenter is not registered", () => {
    expect(() => systemUnderTest.displayLoginModal()).toThrowError(
      "LoginModalPresenter is not registered"
    );
  });

  test("displayLoginForm calls the loginFormPresenter", () => {
    const loginModalPresenterMock = mock<ILoginModalPresenter>();
    systemUnderTest.registerLoginModalPresenter(loginModalPresenterMock);

    systemUnderTest.displayLoginModal();

    expect(loginModalPresenterMock.displayLoginForm).toHaveBeenCalledTimes(1);
  });

  test("loginMoodleSuccessful throws error if LoginModalPresenter is not registered", () => {
    const loginButtonPresenterMock = mock<ILoginButtonPresenter>();
    systemUnderTest.registerLoginButtonPresenter(loginButtonPresenterMock);
    const worldMenuButtonPresenterMock = mock<IWorldMenuButtonPresenter>();
    systemUnderTest.registerWorldMenuButtonPresenter(
      worldMenuButtonPresenterMock
    );

    expect(() => systemUnderTest.loginSuccessful()).toThrowError(
      "LoginModalPresenter is not registered"
    );
  });

  test("loginMoodleSuccessful throws error if LoginButtonPresenter is not registered", () => {
    const loginModalPresenterMock = mock<ILoginModalPresenter>();
    systemUnderTest.registerLoginModalPresenter(loginModalPresenterMock);
    const worldMenuButtonPresenterMock = mock<IWorldMenuButtonPresenter>();
    systemUnderTest.registerWorldMenuButtonPresenter(
      worldMenuButtonPresenterMock
    );

    expect(() => systemUnderTest.loginSuccessful()).toThrowError(
      "LoginButtonPresenter is not registered"
    );
  });
  test("loginMoodleSuccessful throws error if WorldMenuButtonPresenter is not registered", () => {
    const loginModalPresenterMock = mock<ILoginModalPresenter>();
    systemUnderTest.registerLoginModalPresenter(loginModalPresenterMock);
    const loginButtonPresenterMock = mock<ILoginButtonPresenter>();
    systemUnderTest.registerLoginButtonPresenter(loginButtonPresenterMock);

    expect(() => systemUnderTest.loginSuccessful()).toThrowError(
      "WorldMenuButtonPresenter is not registered"
    );
  });

  test("loginMoodleSuccessful calls the loginFormPresenter and the loginButtonPresenter", () => {
    const loginModalPresenterMock = mock<ILoginModalPresenter>();
    const loginButtonPresenterMock = mock<ILoginButtonPresenter>();
    const worldMenuButtonPresenterMock = mock<IWorldMenuButtonPresenter>();
    systemUnderTest.registerLoginModalPresenter(loginModalPresenterMock);
    systemUnderTest.registerLoginButtonPresenter(loginButtonPresenterMock);
    systemUnderTest.registerWorldMenuButtonPresenter(
      worldMenuButtonPresenterMock
    );

    systemUnderTest.loginSuccessful();

    expect(loginModalPresenterMock.setLoginSuccessful).toHaveBeenCalledTimes(1);
    expect(loginButtonPresenterMock.setLoginSuccessful).toHaveBeenCalledTimes(
      1
    );
    expect(
      worldMenuButtonPresenterMock.setLoginSuccessful
    ).toHaveBeenCalledTimes(1);
  });

  test("registerMoodleLoginPresenter registers the presenter if none are present", () => {
    expect(systemUnderTest["loginModalPresenter"]).not.toBeDefined();

    const presenter = mock<ILoginModalPresenter>();
    systemUnderTest.registerLoginModalPresenter(presenter);

    expect(systemUnderTest["loginModalPresenter"]).toBe(presenter);
  });

  test("registerMoodleLoginPresenter warns an error if a presenter was already registered", () => {
    expect(systemUnderTest["loginModalPresenter"]).not.toBeDefined();

    const presenter = mock<ILoginModalPresenter>();
    systemUnderTest.registerLoginModalPresenter(presenter);
    systemUnderTest.registerLoginModalPresenter(presenter);

    expect(logger.warn).toHaveBeenCalledTimes(1);
  });

  test("registerLoginButtonPresenter registers the presenter if none are present", () => {
    expect(systemUnderTest["loginButtonPresenter"]).not.toBeDefined();

    const presenter = mock<ILoginButtonPresenter>();
    systemUnderTest.registerLoginButtonPresenter(presenter);

    expect(systemUnderTest["loginButtonPresenter"]).toBe(presenter);
  });

  test("registerLoginButtonPresenter warns an error if a presenter was already registered", () => {
    expect(systemUnderTest["loginButtonPresenter"]).not.toBeDefined();

    const presenter = mock<ILoginButtonPresenter>();
    systemUnderTest.registerLoginButtonPresenter(presenter);
    systemUnderTest.registerLoginButtonPresenter(presenter);

    expect(logger.warn).toHaveBeenCalledTimes(1);
  });
  test("registerWorldMenuButtonPresenter registers the presenter if none are present", () => {
    expect(systemUnderTest["worldMenuButtonPresenter"]).not.toBeDefined();

    const presenter = mock<IWorldMenuButtonPresenter>();
    systemUnderTest.registerWorldMenuButtonPresenter(presenter);

    expect(systemUnderTest["worldMenuButtonPresenter"]).toBe(presenter);
  });

  test("registerWorldMenuButtonPresenter warns an error if a presenter was already registered", () => {
    expect(systemUnderTest["worldMenuButtonPresenter"]).not.toBeDefined();

    const presenter = mock<IWorldMenuButtonPresenter>();
    systemUnderTest.registerWorldMenuButtonPresenter(presenter);
    systemUnderTest.registerWorldMenuButtonPresenter(presenter);

    expect(logger.warn).toHaveBeenCalledTimes(1);
  });
});
