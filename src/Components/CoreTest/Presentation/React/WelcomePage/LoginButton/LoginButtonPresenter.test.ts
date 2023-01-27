import LoginButtonPresenter from "../../../../../Core/Presentation/React/WelcomePage/LoginButton/LoginButtonPresenter";
import ILoginButtonPresenter from "../../../../../Core/Presentation/React/WelcomePage/LoginButton/ILoginButtonPresenter";
import LoginButtonViewModel from "../../../../../Core/Presentation/React/WelcomePage/LoginButton/LoginButtonViewModel";

describe("LoginButtonPresenter", () => {
  let systemUnderTest: ILoginButtonPresenter;
  let vm: LoginButtonViewModel;

  beforeEach(() => {
    vm = new LoginButtonViewModel();
    systemUnderTest = new LoginButtonPresenter(vm);
  });

  test("onLoginsuccessful sets loginSuccessful in VM to true", () => {
    systemUnderTest.onLoginSuccessful();
    expect(vm.loginSuccessful.Value).toBe(true);
  });

  test("onLoginSuccessful sets modalVisible in the VM to false", () => {
    systemUnderTest.onLoginSuccessful();
    expect(vm.modalVisible.Value).toBe(false);
  });
});
