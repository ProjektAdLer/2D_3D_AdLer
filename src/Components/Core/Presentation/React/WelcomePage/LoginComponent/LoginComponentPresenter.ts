import ILoginComponentPresenter from "./ILoginComponentPresenter";
import LoginComponentViewModel from "./LoginComponentViewModel";

export default class LoginComponentPresenter
  implements ILoginComponentPresenter
{
  constructor(private viewModel: LoginComponentViewModel) {}

  onLoginSuccessful(): void {
    this.viewModel.userLoggedIn.Value = true;
    this.viewModel.modalVisible.Value = false;
  }

  onLogoutSuccessful(): void {
    this.viewModel.userLoggedIn.Value = false;
    this.viewModel.modalVisible.Value = true;
  }
}
