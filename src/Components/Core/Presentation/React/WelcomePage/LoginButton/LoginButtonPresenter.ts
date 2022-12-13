import ILoginButtonPresenter from "./ILoginButtonPresenter";
import LoginButtonViewModel from "./LoginButtonViewModel";

export default class LoginButtonPresenter implements ILoginButtonPresenter {
  constructor(private viewModel: LoginButtonViewModel) {}
  setLoginSuccessful(): void {
    this.viewModel.loginSuccessful.Value = true;
  }
}
