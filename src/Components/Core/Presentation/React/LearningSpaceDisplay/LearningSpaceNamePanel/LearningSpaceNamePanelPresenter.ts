import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import ILearningSpaceNamePanelPresenter from "./ILearningSpaceNamePanelPresenter";
import LearningSpaceNamePanelViewModel from "./LearningSpaceNamePanelViewModel";

export default class LearningSpaceNamePanelPresenter
  implements ILearningSpaceNamePanelPresenter
{
  constructor(private viewModel: LearningSpaceNamePanelViewModel) {}

  onLearningSpaceLoaded(spaceTO: LearningSpaceTO): void {
    this.viewModel.name.Value = spaceTO.name;
  }
}
