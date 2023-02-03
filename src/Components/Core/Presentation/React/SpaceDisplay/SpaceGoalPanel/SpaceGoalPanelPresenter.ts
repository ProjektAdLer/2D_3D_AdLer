import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import ISpaceGoalPanelPresenter from "./ISpaceGoalPanelPresenter";
import SpaceGoalPanelViewModel from "./SpaceGoalPanelViewModel";

export default class SpaceGoalPanelPresenter
  implements ISpaceGoalPanelPresenter
{
  constructor(private viewModel: SpaceGoalPanelViewModel) {}

  onSpaceLoaded(spaceTO: SpaceTO): void {
    this.viewModel.goal.Value = spaceTO.goals;
  }
}
