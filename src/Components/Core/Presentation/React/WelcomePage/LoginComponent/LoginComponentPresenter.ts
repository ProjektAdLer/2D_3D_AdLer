import ILoginComponentPresenter from "./ILoginComponentPresenter";
import LoginComponentViewModel from "./LoginComponentViewModel";

export default class LoginComponentPresenter
  implements ILoginComponentPresenter
{
  constructor(private viewModel: LoginComponentViewModel) {}

  onLoginSuccessful(): void {
    this.viewModel.loginSuccessful.Value = true;
    this.viewModel.modalVisible.Value = false;
  }
}
