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

    // create space data object for each space
    world.spaces.forEach((space) => {
      // check if all requirements are completed
      const isAvailable = space.requirements.every((requiredSpaceId) => {
        const requiredSpace = world.spaces.find(
          (space) => space.id === requiredSpaceId
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
        isAvailable: isAvailable,
        isCompleted: space.currentScore >= space.requiredScore,
      });
    });

    // set all values to ensure correct rendering
    this.viewModel.spaces.Value = newSpaces;
  }
}
