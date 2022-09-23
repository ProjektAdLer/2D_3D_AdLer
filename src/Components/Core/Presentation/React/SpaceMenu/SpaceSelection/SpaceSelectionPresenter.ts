import WorldTO from "src/Components/Core/Application/DataTransferObjects/WorldTO";
import IWorldAdapter from "src/Components/Core/Ports/WorldPort/IWorldAdapter";
import ISpaceSelectionPresenter from "./ISpaceSelectionPresenter";
import SpaceSelectionViewModel from "./SpaceSelectionViewModel";

export default class SpaceSelectionPresenter
  implements ISpaceSelectionPresenter, IWorldAdapter
{
  constructor(private viewModel: SpaceSelectionViewModel) {}

  onWorldLoaded(world: WorldTO): void {
    let newSpaceIDs: number[] = [];
    let newSpaceTitles: string[] = [];

    world.spaces.forEach((space) => {
      newSpaceIDs.push(space.id);
      newSpaceTitles.push(space.name);
    });

    // set all values at once to avoid multiple re-renders
    this.viewModel.spaceIDs.Value = newSpaceIDs;
    this.viewModel.spaceTitles.Value = newSpaceTitles;
  }
}
