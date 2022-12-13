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

  test("should set login successfull in VM", () => {
    systemUnderTest.setLoginSuccessful();
    expect(vm.loginSuccessful.Value).toBe(true);
  });
});
