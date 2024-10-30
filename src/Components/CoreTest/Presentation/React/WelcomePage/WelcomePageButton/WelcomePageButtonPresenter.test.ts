import WelcomePageButtonPresenter from "../../../../../Core/Presentation/React/WelcomePage/WelcomePageButton/WelcomePageButtonPresenter";
import WelcomePageButtonViewModel from "../../../../../Core/Presentation/React/WelcomePage/WelcomePageButton/WelcomePageButtonViewModel";

describe("WelcomePageButtonPresenter", () => {
  let systemUnderTest: WelcomePageButtonPresenter;
  let vm: WelcomePageButtonViewModel;

  beforeEach(() => {
    vm = new WelcomePageButtonViewModel();
    systemUnderTest = new WelcomePageButtonPresenter(vm);
  });

  test("onLoginSuccessful sets userLoggedIn to true", () => {
    vm.userLoggedIn.Value = false;

    systemUnderTest.onLoginSuccessful();

    expect(vm.userLoggedIn.Value).toBe(true);
  });

  test("inLogoutSuccessful sets userLoggedIn to false", () => {
    vm.userLoggedIn.Value = true;

    systemUnderTest.onLogoutSuccessful();

    expect(vm.userLoggedIn.Value).toBe(false);
  });
});
