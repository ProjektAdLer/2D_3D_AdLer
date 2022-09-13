import ILearningWorldNamePanelPresenter from "./ILearningWorldNamePanelPresenter";
import LearningWorldNamePanelViewModel from "./LearningWorldNamePanelViewModel";

export default class LearningWorldNamePanelPresenter
  implements ILearningWorldNamePanelPresenter
{
  constructor(private viewModel: LearningWorldNamePanelViewModel) {}
  displayWorldName(worldName: string) {
    this.viewModel.worldName.Value = worldName;
  }
}
