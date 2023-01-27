import ILoginModalPresenter from "./ILoginModalPresenter";
import LoginModalViewModel from "./LoginModalViewModel";

export default class LoginModalPresenter implements ILoginModalPresenter {
  constructor(private viewModel: LoginModalViewModel) {}

  displayLoginModal(): void {
    this.viewModel.visible.Value = true;
  }
  onLoginSuccessful(): void {
    this.viewModel.visible.Value = false;
  }
}
