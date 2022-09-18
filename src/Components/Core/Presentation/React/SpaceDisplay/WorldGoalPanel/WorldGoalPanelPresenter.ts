import IWorldGoalPanelPresenter from "./IWorldGoalPanelPresenter";
import WorldGoalPanelViewModel from "./WorldGoalPanelViewModel";

export default class WorldGoalPanelPresenter
  implements IWorldGoalPanelPresenter
{
  constructor(private viewModel: WorldGoalPanelViewModel) {}
  displayWorldGoal(worldGoal: string) {
    this.viewModel.worldGoal.Value = worldGoal;
  }
}
