import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import { ElementID } from "src/Components/Core/Domain/Types/EntityTypes";
import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";
import ISpaceNamePanelPresenter from "./ISpaceNamePanelPresenter";
import SpaceNamePanelViewModel from "./SpaceNamePanelViewModel";

export default class SpaceNamePanelPresenter
  implements ISpaceNamePanelPresenter, ISpaceAdapter
{
  constructor(private viewModel: SpaceNamePanelViewModel) {}

  onScoreChanged(
    score: number,
    requiredScore: number,
    maxScore: number,
    spaceID: ElementID
  ): void {}

  onSpaceDataLoaded(spaceTO: SpaceTO): void {
    this.viewModel.name.Value = spaceTO.name;
  }
}
