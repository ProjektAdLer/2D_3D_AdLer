import WorldTO from "src/Components/Core/Application/DataTransferObjects/WorldTO";
import ISpaceSelectionPresenter from "./ISpaceSelectionPresenter";
import SpaceSelectionViewModel, {
  SpaceSelectionSpaceData,
} from "./SpaceSelectionViewModel";

export default class SpaceSelectionPresenter
  implements ISpaceSelectionPresenter
{
  constructor(private viewModel: SpaceSelectionViewModel) {}

  onWorldLoaded(world: WorldTO): void {
    const newSpaces: SpaceSelectionSpaceData[] = [];

    this.viewModel.worldID.Value = world.worldID;

    // create space data object for each space
    world.spaces.forEach((space) => {
      // check if all requirements are completed
      const isAvailable = space.requirements.every((requiredSpaceID) => {
        const requiredSpace = world.spaces.find(
          (space) => space.id === requiredSpaceID
        );

        if (requiredSpace === undefined) {
          throw new Error("Required space not found");
        }

        if (requiredSpace.currentScore >= requiredSpace.requiredScore)
          return true;
        else return false;
      });

      newSpaces.push({
        id: space.id,
        name: space.name,
        requiredSpaces: space.requirements,
        isAvailable: isAvailable,
        isCompleted: space.currentScore >= space.requiredScore,
      });
    });

    // sort spaces like this: completed, available, not available
    newSpaces.sort(this.sortSpaces.bind(this));

    // set all values to ensure correct rendering
    this.viewModel.spaces.Value = newSpaces;
  }

  private sortSpaces(a: SpaceSelectionSpaceData, b: SpaceSelectionSpaceData) {
    if (a.isCompleted && !b.isCompleted) return -1;
    else if (!a.isCompleted && b.isCompleted) return 1;
    else if (a.isAvailable && !b.isAvailable) return -1;
    else if (!a.isAvailable && b.isAvailable) return 1;
    return 0;
  }
}
