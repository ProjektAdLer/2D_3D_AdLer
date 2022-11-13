import MoodleLoginButtonPresenter from "../../../../../Core/Presentation/React/WelcomePage/MoodleLoginButton/MoodleLoginButtonPresenter";
import IMoodleLoginButtonPresenter from "../../../../../Core/Presentation/React/WelcomePage/MoodleLoginButton/IMoodleLoginButtonPresenter";
import MoodleLoginButtonViewModel from "../../../../../Core/Presentation/React/WelcomePage/MoodleLoginButton/MoodleLoginButtonViewModel";

describe("MoodleLoginButtonPresenter", () => {
  let systemUnderTest: IMoodleLoginButtonPresenter;
  let vm: MoodleLoginButtonViewModel;

  beforeEach(() => {
    vm = new MoodleLoginButtonViewModel();
    systemUnderTest = new MoodleLoginButtonPresenter(vm);
  });

  test("should set login successfull in VM", () => {
    systemUnderTest.setLoginSuccessful();
    expect(vm.loginSuccessful.Value).toBe(true);
  });
});
