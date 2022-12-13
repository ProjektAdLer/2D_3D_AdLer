import LoginModalPresenter from "../../../../../../../src/Components/Core/Presentation/React/GeneralComponents/LoginModal/LoginModalPresenter";
import ILoginModalPresenter from "../../../../../../../src/Components/Core/Presentation/React/GeneralComponents/LoginModal/ILoginModalPresenter";
import LoginModalViewModel from "../../../../../../../src/Components/Core/Presentation/React/GeneralComponents/LoginModal/LoginModalViewModel";

describe("LoginModalPresenter", () => {
  let systemUnderTest: ILoginModalPresenter;
  let vm: LoginModalViewModel;

  beforeEach(() => {
    vm = new LoginModalViewModel();
    systemUnderTest = new LoginModalPresenter(vm);
  });

  test("should set visible to fale, if login is successfull", () => {
    systemUnderTest.setLoginSuccessful();
    expect(vm.visible.Value).toBe(false);
  });

  test("should set visible to true, if login should be displayed", () => {
    systemUnderTest.displayLoginForm();
    expect(vm.visible.Value).toBe(true);
  });
});
