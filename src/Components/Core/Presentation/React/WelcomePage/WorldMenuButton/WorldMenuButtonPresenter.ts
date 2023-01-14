import IWorldMenuButtonPresenter from "./IWorldMenuButtonPresenter";
import WorldMenuButtonViewModel from "./WorldMenuButtonViewModel";

export default class WorldMenuButtonPresenter
  implements IWorldMenuButtonPresenter
{
  constructor(private viewModel: WorldMenuButtonViewModel) {}
  displayLoginModal(): void {}
  onLoginSuccessful(): void {
    this.viewModel.loggedInMoodle.Value = true;
  }
}
