import LoginComponentPresenter from "../../../../../Core/Presentation/React/WelcomePage/LoginComponent/LoginComponentPresenter";
import ILoginComponentPresenter from "../../../../../Core/Presentation/React/WelcomePage/LoginComponent/ILoginComponentPresenter";
import LoginComponentViewModel from "../../../../../Core/Presentation/React/WelcomePage/LoginComponent/LoginComponentViewModel";

describe("LoginComponentPresenter", () => {
  let systemUnderTest: ILoginComponentPresenter;
  let vm: LoginComponentViewModel;

  beforeEach(() => {
    vm = new LoginComponentViewModel();
    systemUnderTest = new LoginComponentPresenter(vm);
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
