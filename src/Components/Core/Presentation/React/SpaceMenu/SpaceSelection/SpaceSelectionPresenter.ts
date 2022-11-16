import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import WorldTO from "src/Components/Core/Application/DataTransferObjects/WorldTO";
import IWorldAdapter from "src/Components/Core/Ports/WorldPort/IWorldAdapter";
import ISpaceSelectionPresenter from "./ISpaceSelectionPresenter";
import SpaceSelectionViewModel from "./SpaceSelectionViewModel";

export default class SpaceSelectionPresenter
  implements ISpaceSelectionPresenter, IWorldAdapter
{
  constructor(private viewModel: SpaceSelectionViewModel) {}

  onWorldLoaded(world: WorldTO): void {
    let newSpaces: [number, string, boolean, boolean][] = [];

    world.spaces.forEach((space) => {
      newSpaces.push([space.id, space.name, false, false]);
    });

    // set all values at once to avoid multiple re-renders
    this.viewModel.spaces.Value = newSpaces;

    world.spaces.forEach((space) => {
      this.onSpaceDataLoaded(space);
    });
  }

  onScoreChanged(
    score: number,
    requiredScore: number,
    maxScore: number,
    spaceID: number
  ): void {
    const lookup = this.viewModel.spaces.Value.find(
      (space) => space[0] === spaceID
    );
    if (lookup === undefined) return;
    //check if space is completed
    if (score >= requiredScore) {
      lookup[3] = true;
    }
    //check if all space requirements are completed
    this.viewModel.requirementsList.Value.forEach((spaceRequirement) => {
      if (spaceRequirement[0] === spaceID) {
        if (
          spaceRequirement[1].every((requiredSpaceId) => {
            let requiredSpaces = this.viewModel.spaces.Value.find(
              (space) => space[0] === requiredSpaceId
            );
            if (requiredSpaces === undefined) return true;
            return requiredSpaces[3];
          })
        ) {
          lookup[2] = true;
        } else {
          lookup[2] = false;
        }
      }
    });
  }

  private onSpaceDataLoaded(spaceTO: SpaceTO): void {
    const idArray = this.extractRequirementsIds(
      this.viewModel.requirementsList.Value
    );
    if (spaceTO.id === idArray.find((spaceId) => spaceId === spaceTO.id)) {
      let arrayId = idArray.indexOf(spaceTO.id);
      this.viewModel.requirementsList.Value[arrayId] = [
        spaceTO.id,
        spaceTO.requirements,
      ];
    } else {
      this.viewModel.requirementsList.Value.push([
        spaceTO.id,
        spaceTO.requirements,
      ]);
    }
  }
  private extractRequirementsIds(
    requirementsList: [number, number[]][]
  ): number[] {
    let idArray = requirementsList.map((listEntry) => listEntry[0]);
    return idArray;
  }
}
