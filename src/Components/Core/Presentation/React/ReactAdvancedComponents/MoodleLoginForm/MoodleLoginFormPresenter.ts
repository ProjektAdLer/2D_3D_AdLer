import IMoodleLoginFormPresenter from "./IMoodleLoginFormPresenter";
import MoodleLoginFormViewModel from "./MoodleLoginFormViewModel";

export default class MoodleLoginFormPresenter
  implements IMoodleLoginFormPresenter
{
  constructor(private viewModel: MoodleLoginFormViewModel) {}

  debug_DisplayUserToken(userToken: string): void {
    this.viewModel.userToken.Value = userToken;
  }
}
