import IMoodleLoginButtonPresenter from "./IMoodleLoginButtonPresenter";
import MoodleLoginButtonViewModel from "./MoodleLoginButtonViewModel";

export default class MoodleLoginButtonPresenter
  implements IMoodleLoginButtonPresenter
{
  constructor(private viewModel: MoodleLoginButtonViewModel) {}
  setLoginSuccessful(): void {
    this.viewModel.loginSuccessful.Value = true;
  }
}
