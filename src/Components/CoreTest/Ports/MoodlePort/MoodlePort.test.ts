import { mock } from "jest-mock-extended";
import MoodlePort from "../../../Core/Ports/MoodlePort/MoodlePort";
import IMoodleLoginButtonPresenter from "../../../Core/Presentation/React/MoodleLoginButton/IMoodleLoginButtonPresenter";
import IMoodleLoginFormPresenter from "../../../Core/Presentation/React/MoodleLoginForm/IMoodleLoginFormPresenter";
import CoreDIContainer from "../../../../Components/Core/DependencyInjection/CoreDIContainer";
import { logger } from "../../../../Lib/Logger";

jest.mock("src/Lib/Logger");

describe("MoodlePort", () => {
  let systemUnderTest: MoodlePort;

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(MoodlePort);
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

  test("loginSuccessful throws error if MoodleLoginFormPresenter is not registered", () => {
    const moodleLoginButtonPresenterMock = mock<IMoodleLoginButtonPresenter>();
    systemUnderTest.registerMoodleLoginButtonPresenter(
      moodleLoginButtonPresenterMock
    );

    expect(() => systemUnderTest.loginSuccessful()).toThrowError(
      "MoodleLoginFormPresenter is not registered"
    );
  });

  test("loginSuccessful throws error if MoodleLoginButtonPresenter is not registered", () => {
    const moodleLoginFormPresenterMock = mock<IMoodleLoginFormPresenter>();
    systemUnderTest.registerMoodleLoginFormPresenter(
      moodleLoginFormPresenterMock
    );

    expect(() => systemUnderTest.loginSuccessful()).toThrowError(
      "MoodleLoginButtonPresenter is not registered"
    );
  });

  test("loginSuccessful calls the loginFormPresenter and the loginButtonPresenter", () => {
    const moodleLoginFormPresenterMock = mock<IMoodleLoginFormPresenter>();
    const moodleLoginButtonPresenterMock = mock<IMoodleLoginButtonPresenter>();
    systemUnderTest.registerMoodleLoginFormPresenter(
      moodleLoginFormPresenterMock
    );
    systemUnderTest.registerMoodleLoginButtonPresenter(
      moodleLoginButtonPresenterMock
    );

    systemUnderTest.loginSuccessful();

    expect(moodleLoginFormPresenterMock.loginSuccessful).toHaveBeenCalledTimes(
      1
    );
    expect(
      moodleLoginButtonPresenterMock.setLoginSuccessful
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
});
