import LearningWorldMenuButtonPresenter from "../../../../../Core/Presentation/React/WelcomePage/LearningWorldMenuButton/LearningWorldMenuButtonPresenter";
import LearningWorldMenuButtonViewModel from "../../../../../Core/Presentation/React/WelcomePage/LearningWorldMenuButton/LearningWorldMenuButtonViewModel";

describe("LearningWorldMenuButtonPresenter", () => {
  let systemUnderTest: LearningWorldMenuButtonPresenter;
  let vm: LearningWorldMenuButtonViewModel;

  beforeEach(() => {
    vm = new LearningWorldMenuButtonViewModel();
    systemUnderTest = new LearningWorldMenuButtonPresenter(vm);
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
