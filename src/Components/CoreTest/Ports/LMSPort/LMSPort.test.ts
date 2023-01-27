import { mock } from "jest-mock-extended";
import LMSPort from "../../../Core/Ports/LMSPort/LMSPort";
import LoginButtonPresenter from "../../../Core/Presentation/React/WelcomePage/LoginButton/LoginButtonPresenter";
import WorldMenuButtonPresenter from "../../../Core/Presentation/React/WelcomePage/WorldMenuButton/WorldMenuButtonPresenter";

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
});
