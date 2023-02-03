import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import { ElementID } from "src/Components/Core/Domain/Types/EntityTypes";
import ISpaceNamePanelPresenter from "./ISpaceNamePanelPresenter";
import SpaceNamePanelViewModel from "./SpaceNamePanelViewModel";

export default class SpaceNamePanelPresenter
  implements ISpaceNamePanelPresenter
{
  constructor(private viewModel: SpaceNamePanelViewModel) {}

  onSpaceLoaded(spaceTO: SpaceTO): void {
    this.viewModel.name.Value = spaceTO.name;
  }
}
