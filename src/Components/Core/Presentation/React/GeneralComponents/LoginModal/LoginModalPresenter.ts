import ILoginModalPresenter from "./ILoginModalPresenter";
import LoginModalViewModel from "./LoginModalViewModel";

export default class LoginModalPresenter implements ILoginModalPresenter {
  constructor(private viewModel: LoginModalViewModel) {}
  setLoginSuccessful(): void {
    this.viewModel.visible.Value = false;
  }
  displayLoginForm(): void {
    this.viewModel.visible.Value = true;
  }
}
