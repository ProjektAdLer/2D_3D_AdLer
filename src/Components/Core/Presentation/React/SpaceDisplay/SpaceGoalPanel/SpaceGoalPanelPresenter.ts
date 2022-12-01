import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";
import ISpaceGoalPanelPresenter from "./ISpaceGoalPanelPresenter";
import SpaceGoalPanelViewModel from "./SpaceGoalPanelViewModel";

export default class SpaceGoalPanelPresenter
  implements ISpaceGoalPanelPresenter, ISpaceAdapter
{
  constructor(private viewModel: SpaceGoalPanelViewModel) {}

  onScoreChanged(
    score: number,
    requiredScore: number,
    maxScore: number,
    spaceID: number
  ): void {}

  onSpaceLoaded(spaceTO: SpaceTO): void {
    this.viewModel.goal.Value = spaceTO.goals;
  }
}
