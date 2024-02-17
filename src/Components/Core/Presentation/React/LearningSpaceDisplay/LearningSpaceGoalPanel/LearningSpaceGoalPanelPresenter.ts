import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import ILearningSpaceGoalPanelPresenter from "./ILearningSpaceGoalPanelPresenter";
import LearningSpaceGoalPanelViewModel from "./LearningSpaceGoalPanelViewModel";

export default class LearningSpaceGoalPanelPresenter
  implements ILearningSpaceGoalPanelPresenter
{
  constructor(private viewModel: LearningSpaceGoalPanelViewModel) {}

  openOrCloseGoals(): void {
    this.viewModel.isOpen.Value = !this.viewModel.isOpen.Value;
  }

  onLearningSpaceLoaded(spaceTO: LearningSpaceTO): void {
    let goals: string[] = [];
    spaceTO.goals.forEach((goal) => {
      if (goal && goal !== "") goals.push(goal);
    });

    this.viewModel.goals.Value = goals;
  }
}
