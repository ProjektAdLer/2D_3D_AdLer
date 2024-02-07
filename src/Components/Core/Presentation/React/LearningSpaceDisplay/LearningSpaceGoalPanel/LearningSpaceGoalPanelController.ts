import bind from "bind-decorator";
import ILearningSpaceGoalPanelController from "./ILearningSpaceGoalPanelController";
import LearningSpaceGoalPanelViewModel from "./LearningSpaceGoalPanelViewModel";

export default class LearningSpaceGoalPanelController
  implements ILearningSpaceGoalPanelController
{
  constructor(private viewModel: LearningSpaceGoalPanelViewModel) {}

  @bind
  closePanel(): void {
    this.viewModel.isOpen.Value = false;
  }
  @bind
  openPanel(): void {
    this.viewModel.isOpen.Value = true;
  }
}
