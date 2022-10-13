import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import WorldTO from "src/Components/Core/Application/DataTransferObjects/WorldTO";
import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";
import IWorldAdapter from "src/Components/Core/Ports/WorldPort/IWorldAdapter";
import ISpaceSelectionPresenter from "./ISpaceSelectionPresenter";
import SpaceSelectionViewModel from "./SpaceSelectionViewModel";

export default class SpaceSelectionPresenter
  implements ISpaceSelectionPresenter, IWorldAdapter, ISpaceAdapter
{
  constructor(private viewModel: SpaceSelectionViewModel) {}

  onSpaceDataLoaded(spaceTO: SpaceTO): void {}

  onScoreChanged(
    score: number,
    requiredScore: number,
    maxScore: number,
    spaceID: number
  ): void {
    this.viewModel.spacesCompleted.Value.push([
      spaceID,
      score >= requiredScore,
    ]);
  }

  onWorldLoaded(world: WorldTO): void {
    let newSpaces: [number, string][] = [];

    world.spaces.forEach((space) => {
      newSpaces.push([space.id, space.name]);
    });

    // set all values at once to avoid multiple re-renders
    this.viewModel.spaces.Value = newSpaces;
  }
}
