import MoodleLoginButtonPresenter from "../../../../../../../src/Components/Core/Presentation/React/GeneralComponents/MoodleLoginButton/MoodleLoginButtonPresenter";
import IMoodleLoginButtonPresenter from "../../../../../../../src/Components/Core/Presentation/React/GeneralComponents/MoodleLoginButton/IMoodleLoginButtonPresenter";
import MoodleLoginButtonViewModel from "../../../../../Core/Presentation/React/GeneralComponents/MoodleLoginButton/MoodleLoginButtonViewModel";

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
