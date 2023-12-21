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

  onLogoutSuccessful(): void {
    this.viewModel.userLoggedIn.Value = false;
    this.viewModel.modalVisible.Value = true;
  }
}
