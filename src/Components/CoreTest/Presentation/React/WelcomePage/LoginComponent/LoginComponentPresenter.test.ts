import LoginComponentPresenter from "../../../../../Core/Presentation/React/WelcomePage/LoginComponent/LoginComponentPresenter";
import LoginComponentViewModel from "../../../../../Core/Presentation/React/WelcomePage/LoginComponent/LoginComponentViewModel";

describe("LoginComponentPresenter", () => {
  let systemUnderTest: LoginComponentPresenter;
  let vm: LoginComponentViewModel;

  beforeEach(() => {
    vm = new LoginComponentViewModel();
    systemUnderTest = new LoginComponentPresenter(vm);
  });

  test("onLoginsuccessful sets userLoggedIn in VM to true", () => {
    systemUnderTest.onLoginSuccessful();
    expect(vm.userLoggedIn.Value).toBe(true);
  });

  test("onLoginSuccessful sets modalVisible in the VM to false", () => {
    systemUnderTest.onLoginSuccessful();
    expect(vm.modalVisible.Value).toBe(false);
  });

  test("onLogoutSuccessful sets userLoggedIn in VM to false", () => {
    systemUnderTest.onLogoutSuccessful();
    expect(vm.userLoggedIn.Value).toBe(false);
  });

  test("onLogoutSuccessful sets modalVisible in the VM to true", () => {
    systemUnderTest.onLogoutSuccessful();
    expect(vm.modalVisible.Value).toBe(true);
  });
});
