import { mock } from "jest-mock-extended";
import LMSPort from "../../../../Core/Application/Ports/LMSPort/LMSPort";
import LoginButtonPresenter from "../../../../Core/Presentation/React/WelcomePage/LoginComponent/ILoginComponentPresenter";
import WorldMenuButtonPresenter from "../../../../Core/Presentation/React/WelcomePage/WorldMenuButton/WorldMenuButtonPresenter";

describe("LMSPort", () => {
  let systemUnderTest: LMSPort;

  beforeEach(() => {
    systemUnderTest = new LMSPort();
  });

  test("onLoginSuccessful is being called on scorePanelPresenter", () => {
    const mockedLoginButtonPresenter = mock<LoginButtonPresenter>();
    const mockedWorldMenuButtonPresenter = mock<WorldMenuButtonPresenter>();
    systemUnderTest.registerAdapter(mockedWorldMenuButtonPresenter);
    systemUnderTest.registerAdapter(mockedLoginButtonPresenter);

    systemUnderTest.onLoginSuccessful();

    expect(
      mockedWorldMenuButtonPresenter.onLoginSuccessful
    ).toHaveBeenCalledTimes(1);
    expect(mockedLoginButtonPresenter.onLoginSuccessful).toHaveBeenCalledTimes(
      1
    );
  });
});
