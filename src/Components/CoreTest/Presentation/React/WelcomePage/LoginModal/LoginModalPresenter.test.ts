import ILoginModalPresenter from "../../../../../Core/Presentation/React/WelcomePage/LoginModal/ILoginModalPresenter";
import LoginModalPresenter from "../../../../../Core/Presentation/React/WelcomePage/LoginModal/LoginModalPresenter";
import LoginModalViewModel from "../../../../../Core/Presentation/React/WelcomePage/LoginModal/LoginModalViewModel";

describe("LoginModalPresenter", () => {
  let systemUnderTest: ILoginModalPresenter;
  let vm: LoginModalViewModel;

  beforeEach(() => {
    vm = new LoginModalViewModel();
    systemUnderTest = new LoginModalPresenter(vm);
  });

  test("should set visible to fale, if login is successfull", () => {
    systemUnderTest.onLoginSuccessful();
    expect(vm.visible.Value).toBe(false);
  });

  test("should set visible to true, if login should be displayed", () => {
    systemUnderTest.displayLoginModal();
    expect(vm.visible.Value).toBe(true);
  });
});
