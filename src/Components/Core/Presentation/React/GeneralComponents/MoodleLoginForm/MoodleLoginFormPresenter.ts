import IMoodleLoginFormPresenter from "./IMoodleLoginFormPresenter";
import MoodleLoginFormViewModel from "./MoodleLoginFormViewModel";

export default class MoodleLoginFormPresenter
  implements IMoodleLoginFormPresenter
{
  constructor(private viewModel: MoodleLoginFormViewModel) {}
  loginSuccessful(): void {
    this.viewModel.visible.Value = false;
  }
  displayLoginForm(): void {
    this.viewModel.visible.Value = true;
  }
}
