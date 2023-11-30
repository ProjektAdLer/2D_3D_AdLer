import ILearningWorldMenuButtonPresenter from "./ILearningWorldMenuButtonPresenter";
import LearningWorldMenuButtonViewModel from "./LearningWorldMenuButtonViewModel";

export default class LearningWorldMenuButtonPresenter
  implements ILearningWorldMenuButtonPresenter
{
  constructor(private viewModel: LearningWorldMenuButtonViewModel) {}

  onLoginSuccessful(): void {
    this.viewModel.userLoggedIn.Value = true;
  }

  onLogoutSuccessful(): void {
    this.viewModel.userLoggedIn.Value = false;
  }
}
