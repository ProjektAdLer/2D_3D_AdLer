import IWelcomePageButtonPresenter from "./IWelcomePageButtonPresenter";
import WelcomePageButtonViewModel from "./WelcomePageButtonViewModel";

export default class WelcomePageButtonPresenter
  implements IWelcomePageButtonPresenter
{
  constructor(private viewModel: WelcomePageButtonViewModel) {}

  onLoginSuccessful(): void {
    this.viewModel.userLoggedIn.Value = true;
  }

  onLogoutSuccessful(): void {
    this.viewModel.userLoggedIn.Value = false;
  }
}
