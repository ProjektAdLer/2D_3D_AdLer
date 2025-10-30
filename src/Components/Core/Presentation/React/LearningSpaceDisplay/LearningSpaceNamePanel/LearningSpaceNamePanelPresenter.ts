import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import ILearningSpaceNamePanelPresenter from "./ILearningSpaceNamePanelPresenter";
import LearningSpaceNamePanelViewModel from "./LearningSpaceNamePanelViewModel";
import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";

export default class LearningSpaceNamePanelPresenter
  implements ILearningSpaceNamePanelPresenter
{
  constructor(private viewModel: LearningSpaceNamePanelViewModel) {}

  onLearningSpaceLoaded(spaceTO: LearningSpaceTO): void {
    this.viewModel.name.Value = spaceTO.name;
  }

  onLearningWorldEntityLoaded(worldTO: LearningWorldTO): void {
    this.viewModel.parentWorldName = worldTO.name;
  }
}
