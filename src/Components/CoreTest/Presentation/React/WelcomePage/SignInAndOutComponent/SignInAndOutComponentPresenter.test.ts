import SignInAndOutComponentPresenter from "../../../../../Core/Presentation/React/WelcomePage/SignInAndOutComponent/SignInAndOutComponentPresenter";
import SignInAndOutComponentViewModel from "../../../../../Core/Presentation/React/WelcomePage/SignInAndOutComponent/SignInAndOutComponentViewModel";

describe("SignInAndOutComponentPresenter", () => {
  let systemUnderTest: SignInAndOutComponentPresenter;
  let vm: SignInAndOutComponentViewModel;

  beforeEach(() => {
    vm = new SignInAndOutComponentViewModel();
    systemUnderTest = new SignInAndOutComponentPresenter(vm);
  });

  test("onLoginsuccessful sets userLoggedIn in VM to true", () => {
    systemUnderTest.onLoginSuccessful("tester");
    expect(vm.userLoggedIn.Value).toBe(true);
  });

  test("onLoginSuccessful sets modalVisible in the VM to false", () => {
    systemUnderTest.onLoginSuccessful("tester");
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
