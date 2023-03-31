import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import ISpaceGoalPanelPresenter from "./ISpaceGoalPanelPresenter";
import SpaceGoalPanelViewModel from "./SpaceGoalPanelViewModel";

export default class SpaceGoalPanelPresenter
  implements ISpaceGoalPanelPresenter
{
  constructor(private viewModel: SpaceGoalPanelViewModel) {}

  onSpaceLoaded(spaceTO: LearningSpaceTO): void {
    this.viewModel.goals.Value = spaceTO.goals;
  }
}
