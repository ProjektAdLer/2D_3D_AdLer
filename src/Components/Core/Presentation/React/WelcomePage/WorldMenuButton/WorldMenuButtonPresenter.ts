import IWorldMenuButtonPresenter from "./IWorldMenuButtonPresenter";
import WorldMenuButtonViewModel from "./WorldMenuButtonViewModel";

export default class WorldMenuButtonPresenter
  implements IWorldMenuButtonPresenter
{
  constructor(private viewModel: WorldMenuButtonViewModel) {}
  setLoginSuccessful(): void {
    this.viewModel.loggedInMoodle.Value = true;
  }
}
