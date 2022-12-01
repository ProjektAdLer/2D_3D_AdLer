import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import WorldTO from "src/Components/Core/Application/DataTransferObjects/WorldTO";
import ISpaceSelectionPresenter from "./ISpaceSelectionPresenter";
import SpaceSelectionViewModel from "./SpaceSelectionViewModel";

export default class SpaceSelectionPresenter
  implements ISpaceSelectionPresenter
{
  constructor(private viewModel: SpaceSelectionViewModel) {}
  onSpaceLoaded(spaceTO: SpaceTO): void {}

  onWorldLoaded(world: WorldTO): void {
    let newSpaces: [number, string, boolean, boolean][] = [];

    world.spaces.forEach((space) => {
      newSpaces.push([space.id, space.name, false, false]);
    });

    // set all values at once to avoid multiple re-renders
    this.viewModel.spaces.Value = newSpaces;

    world.spaces.forEach((space) => {
      this.spaceDataLoaded(space);
    });
  }

  onScoreChanged(
    score: number,
    requiredScore: number,
    maxScore: number,
    spaceID: number
  ): void {
    const spacesLookup = this.viewModel.spaces.Value.find(
      (space) => space[0] === spaceID
    );
    const requirementsLookup = this.viewModel.requirementsList.Value.find(
      (spaceRequirement) => spaceRequirement[0] === spaceID
    );
    if (spacesLookup === undefined) return;
    //check if space is completed
    if (score >= requiredScore) {
      spacesLookup[3] = true;
    }
    //check if all space requirements are completed
    requirementsLookup !== undefined &&
      (spacesLookup[2] = requirementsLookup[1].every((requiredSpaceId) => {
        let requiredSpace = this.viewModel.spaces.Value.find(
          (space) => space[0] === requiredSpaceId
        );
        if (requiredSpace === undefined) {
          throw new Error("Required space not found");
        }
        return requiredSpace[3];
      }));
  }

  private spaceDataLoaded(space: SpaceTO): void {
    const idArray = this.extractRequirementsIds(
      this.viewModel.requirementsList.Value
    );
    if (space.id === idArray.find((spaceId) => spaceId === space.id)) {
      let arrayId = idArray.indexOf(space.id);
      this.viewModel.requirementsList.Value[arrayId] = [
        space.id,
        space.requirements,
      ];
    } else {
      this.viewModel.requirementsList.Value.push([
        space.id,
        space.requirements,
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
