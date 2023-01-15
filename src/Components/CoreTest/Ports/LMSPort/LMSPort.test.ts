import { mock } from "jest-mock-extended";
import LMSPort from "../../../Core/Ports/LMSPort/LMSPort";
import LoginButtonPresenter from "../../../Core/Presentation/React/WelcomePage/LoginButton/LoginButtonPresenter";
import WorldMenuButtonPresenter from "../../../Core/Presentation/React/WelcomePage/WorldMenuButton/WorldMenuButtonPresenter";
import LoginModalPresenter from "../../../Core/Presentation/React/GeneralComponents/LoginModal/LoginModalPresenter";

jest.mock("src/Lib/Logger");

describe("LMSPort", () => {
  let systemUnderTest: LMSPort;

  beforeEach(() => {
    systemUnderTest = new LMSPort();
  });
  //TODO: Convert tests to 'for each' tests
  test("registerAdapter adds new presenter", () => {
    const loginButtonPresenter = mock<LoginButtonPresenter>();

    systemUnderTest.registerAdapter(loginButtonPresenter);

    expect(systemUnderTest["adapters"][0]).toBe(loginButtonPresenter);
  });
  test("displayLoginModal is being called on scorePanelPresenter", () => {
    const loginButtonPresenter = mock<LoginButtonPresenter>();
    systemUnderTest.registerAdapter(loginButtonPresenter);

    systemUnderTest.displayLoginModal();

    expect(loginButtonPresenter.displayLoginModal).toHaveBeenCalledTimes(1);
  });
  test("displayLoginModal is being called on worldMenuButtonPresenter", () => {
    const worldMenuButtonPresenter = mock<WorldMenuButtonPresenter>();
    systemUnderTest.registerAdapter(worldMenuButtonPresenter);

    systemUnderTest.displayLoginModal();

    expect(worldMenuButtonPresenter.displayLoginModal).toHaveBeenCalledTimes(1);
  });
  test("displayLoginModal is being called on loginModalPresenter", () => {
    const loginModalPresenter = mock<LoginModalPresenter>();
    systemUnderTest.registerAdapter(loginModalPresenter);

    systemUnderTest.displayLoginModal();

    expect(loginModalPresenter.displayLoginModal).toHaveBeenCalledTimes(1);
  });
  test("onLoginSuccessful is being called on scorePanelPresenter", () => {
    const loginButtonPresenter = mock<LoginButtonPresenter>();
    systemUnderTest.registerAdapter(loginButtonPresenter);

    systemUnderTest.onLoginSuccessful();

    expect(loginButtonPresenter.onLoginSuccessful).toHaveBeenCalledTimes(1);
  });
  test("onLoginSuccessful is being called on worldMenuButtonPresenter", () => {
    const worldMenuButtonPresenter = mock<WorldMenuButtonPresenter>();
    systemUnderTest.registerAdapter(worldMenuButtonPresenter);

    systemUnderTest.onLoginSuccessful();

    expect(worldMenuButtonPresenter.onLoginSuccessful).toHaveBeenCalledTimes(1);
  });
  test("onLoginSuccessful is being called on loginModalPresenter", () => {
    const loginModalPresenter = mock<LoginModalPresenter>();
    systemUnderTest.registerAdapter(loginModalPresenter);

    systemUnderTest.onLoginSuccessful();

    expect(loginModalPresenter.onLoginSuccessful).toHaveBeenCalledTimes(1);
  });
});
