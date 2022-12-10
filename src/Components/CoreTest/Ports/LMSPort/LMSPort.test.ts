import { mock } from "jest-mock-extended";
import LMSPort from "../../../Core/Ports/LMSPort/LMSPort";
import IMoodleLoginButtonPresenter from "../../../Core/Presentation/React/WelcomePage/MoodleLoginButton/IMoodleLoginButtonPresenter";
import IMoodleLoginFormPresenter from "../../../Core/Presentation/React/GeneralComponents/MoodleLoginForm/IMoodleLoginFormPresenter";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import { logger } from "../../../../Lib/Logger";
import IWorldMenuButtonPresenter from "../../../Core/Presentation/React/WelcomePage/WorldMenuButton/IWorldMenuButtonPresenter";

jest.mock("src/Lib/Logger");

describe("LMSPort", () => {
  let systemUnderTest: LMSPort;

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LMSPort);
  });

  test("displayLoginForm throws error if MoodleLoginFormPresenter is not registered", () => {
    expect(() => systemUnderTest.displayLoginForm()).toThrowError(
      "MoodleLoginFormPresenter is not registered"
    );
  });

  test("displayLoginForm calls the loginFormPresenter", () => {
    const moodleLoginFormPresenterMock = mock<IMoodleLoginFormPresenter>();
    systemUnderTest.registerMoodleLoginFormPresenter(
      moodleLoginFormPresenterMock
    );

    systemUnderTest.displayLoginForm();

    expect(moodleLoginFormPresenterMock.displayLoginForm).toHaveBeenCalledTimes(
      1
    );
  });

  test("loginMoodleSuccessful throws error if MoodleLoginFormPresenter is not registered", () => {
    const moodleLoginButtonPresenterMock = mock<IMoodleLoginButtonPresenter>();
    systemUnderTest.registerMoodleLoginButtonPresenter(
      moodleLoginButtonPresenterMock
    );
    const worldMenuButtonPresenterMock = mock<IWorldMenuButtonPresenter>();
    systemUnderTest.registerWorldMenuButtonPresenter(
      worldMenuButtonPresenterMock
    );

    expect(() => systemUnderTest.loginMoodleSuccessful()).toThrowError(
      "MoodleLoginFormPresenter is not registered"
    );
  });

  test("loginMoodleSuccessful throws error if MoodleLoginButtonPresenter is not registered", () => {
    const moodleLoginFormPresenterMock = mock<IMoodleLoginFormPresenter>();
    systemUnderTest.registerMoodleLoginFormPresenter(
      moodleLoginFormPresenterMock
    );
    const worldMenuButtonPresenterMock = mock<IWorldMenuButtonPresenter>();
    systemUnderTest.registerWorldMenuButtonPresenter(
      worldMenuButtonPresenterMock
    );

    expect(() => systemUnderTest.loginMoodleSuccessful()).toThrowError(
      "MoodleLoginButtonPresenter is not registered"
    );
  });
  test("loginMoodleSuccessful throws error if WorldMenuButtonPresenter is not registered", () => {
    const moodleLoginFormPresenterMock = mock<IMoodleLoginFormPresenter>();
    systemUnderTest.registerMoodleLoginFormPresenter(
      moodleLoginFormPresenterMock
    );
    const moodleLoginButtonPresenterMock = mock<IMoodleLoginButtonPresenter>();
    systemUnderTest.registerMoodleLoginButtonPresenter(
      moodleLoginButtonPresenterMock
    );

    expect(() => systemUnderTest.loginMoodleSuccessful()).toThrowError(
      "WorldMenuButtonPresenter is not registered"
    );
  });

  test("loginMoodleSuccessful calls the loginFormPresenter and the loginButtonPresenter", () => {
    const moodleLoginFormPresenterMock = mock<IMoodleLoginFormPresenter>();
    const moodleLoginButtonPresenterMock = mock<IMoodleLoginButtonPresenter>();
    const worldMenuButtonPresenterMock = mock<IWorldMenuButtonPresenter>();
    systemUnderTest.registerMoodleLoginFormPresenter(
      moodleLoginFormPresenterMock
    );
    systemUnderTest.registerMoodleLoginButtonPresenter(
      moodleLoginButtonPresenterMock
    );
    systemUnderTest.registerWorldMenuButtonPresenter(
      worldMenuButtonPresenterMock
    );

    systemUnderTest.loginMoodleSuccessful();

    expect(
      moodleLoginFormPresenterMock.setLoginSuccessful
    ).toHaveBeenCalledTimes(1);
    expect(
      moodleLoginButtonPresenterMock.setLoginSuccessful
    ).toHaveBeenCalledTimes(1);
    expect(
      worldMenuButtonPresenterMock.setLoginSuccessful
    ).toHaveBeenCalledTimes(1);
  });

  test("registerMoodleLoginPresenter registers the presenter if none are present", () => {
    expect(systemUnderTest["moodleLoginFormPresenter"]).not.toBeDefined();

    const presenter = mock<IMoodleLoginFormPresenter>();
    systemUnderTest.registerMoodleLoginFormPresenter(presenter);

    expect(systemUnderTest["moodleLoginFormPresenter"]).toBe(presenter);
  });

  test("registerMoodleLoginPresenter warns an error if a presenter was already registered", () => {
    expect(systemUnderTest["moodleLoginFormPresenter"]).not.toBeDefined();

    const presenter = mock<IMoodleLoginFormPresenter>();
    systemUnderTest.registerMoodleLoginFormPresenter(presenter);
    systemUnderTest.registerMoodleLoginFormPresenter(presenter);

    expect(logger.warn).toHaveBeenCalledTimes(1);
  });

  test("registerMoodleLoginButtonPresenter registers the presenter if none are present", () => {
    expect(systemUnderTest["moodleLoginButtonPresenter"]).not.toBeDefined();

    const presenter = mock<IMoodleLoginButtonPresenter>();
    systemUnderTest.registerMoodleLoginButtonPresenter(presenter);

    expect(systemUnderTest["moodleLoginButtonPresenter"]).toBe(presenter);
  });

  test("registerMoodleLoginButtonPresenter warns an error if a presenter was already registered", () => {
    expect(systemUnderTest["moodleLoginButtonPresenter"]).not.toBeDefined();

    const presenter = mock<IMoodleLoginButtonPresenter>();
    systemUnderTest.registerMoodleLoginButtonPresenter(presenter);
    systemUnderTest.registerMoodleLoginButtonPresenter(presenter);

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
