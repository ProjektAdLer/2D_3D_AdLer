import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";
import ISpaceNamePanelPresenter from "./ISpaceNamePanelPresenter";
import SpaceNamePanelViewModel from "./SpaceNamePanelViewModel";

export default class SpaceNamePanelPresenter
  implements ISpaceNamePanelPresenter, ISpaceAdapter
{
  constructor(private viewModel: SpaceNamePanelViewModel) {}

  onSpaceDataLoaded(spaceTO: SpaceTO): void {
    this.viewModel.name.Value = spaceTO.name;
  }
}
