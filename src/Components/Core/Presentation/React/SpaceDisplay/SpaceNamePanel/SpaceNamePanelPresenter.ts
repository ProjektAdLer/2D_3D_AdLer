import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import ISpaceNamePanelPresenter from "./ISpaceNamePanelPresenter";
import SpaceNamePanelViewModel from "./SpaceNamePanelViewModel";

export default class SpaceNamePanelPresenter
  implements ISpaceNamePanelPresenter
{
  constructor(private viewModel: SpaceNamePanelViewModel) {}

  onSpaceLoaded(spaceTO: LearningSpaceTO): void {
    this.viewModel.name.Value = spaceTO.name;
  }
}
