import ISignInAndOutComponentPresenter from "./ISignInAndOutComponentPresenter";
import SignInAndOutComponentViewModel from "./SignInAndOutComponentViewModel";

export default class SignInAndOutComponentPresenter
  implements ISignInAndOutComponentPresenter
{
  constructor(private viewModel: SignInAndOutComponentViewModel) {}

  onLoginSuccessful(userName: string): void {
    this.viewModel.userLoggedIn.Value = true;
    this.viewModel.modalVisible.Value = false;
    this.viewModel.userName.Value = userName;
  }

  onLoginFailure(errorMessage: string, errorMessageAdvise: string): void {
    this.viewModel.errorMessage.Value = errorMessage;
    this.viewModel.errorMessageAdvise.Value = errorMessageAdvise;
    this.viewModel.loginFailed.Value = true;
  }

  onLogoutSuccessful(): void {
    this.viewModel.userLoggedIn.Value = false;
    this.viewModel.modalVisible.Value = true;
  }
}
