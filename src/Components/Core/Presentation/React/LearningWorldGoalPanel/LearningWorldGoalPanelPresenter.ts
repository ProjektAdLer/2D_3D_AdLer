import ILearningWorldGoalPanelPresenter from "./ILearningWorldGoalPanelPresenter";
import LearningWorldGoalPanelViewModel from "./LearningWorldGoalPanelViewModel";

export default class LearningWorldGoalPanelPresenter
  implements ILearningWorldGoalPanelPresenter
{
  constructor(private viewModel: LearningWorldGoalPanelViewModel) {}
  displayWorldGoal(worldGoal: string) {
    this.viewModel.worldGoal.Value = worldGoal;
  }
}
