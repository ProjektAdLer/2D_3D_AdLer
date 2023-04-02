import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import ILearningSpaceGoalPanelPresenter from "./ILearningSpaceGoalPanelPresenter";
import LearningSpaceGoalPanelViewModel from "./LearningSpaceGoalPanelViewModel";

export default class LearningSpaceGoalPanelPresenter
  implements ILearningSpaceGoalPanelPresenter
{
  constructor(private viewModel: LearningSpaceGoalPanelViewModel) {}

  onLearningSpaceLoaded(spaceTO: LearningSpaceTO): void {
    this.viewModel.goals.Value = spaceTO.goals;
  }
}
