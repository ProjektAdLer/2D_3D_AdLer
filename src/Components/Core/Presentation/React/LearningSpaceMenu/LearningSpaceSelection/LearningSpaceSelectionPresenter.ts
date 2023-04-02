import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
import ILearningSpaceSelectionPresenter from "./ILearningSpaceSelectionPresenter";
import LearningSpaceSelectionViewModel, {
  RequiredLearningSpaceData,
  LearningSpaceSelectionLearningSpaceData,
} from "./LearningSpaceSelectionViewModel";

export default class LearningSpaceSelectionPresenter
  implements ILearningSpaceSelectionPresenter
{
  constructor(private viewModel: LearningSpaceSelectionViewModel) {}

  onLearningWorldLoaded(world: LearningWorldTO): void {
    const newSpaces: LearningSpaceSelectionLearningSpaceData[] = [];

    this.viewModel.worldID.Value = world.id;

    // create space data object for each space
    world.spaces.forEach((space) => {
      // check if all requirements are completed
      let requiredSpaces: RequiredLearningSpaceData[] = [];
      let isAvailable = true;
      // space.requirements.forEach((requiredSpaceID) => {
      //   const requiredSpace = world.spaces.find(
      //     (space) => space.id === requiredSpaceID
      //   );

      //   if (requiredSpace === undefined) {
      //     throw new Error("Required space not found");
      //   }

      //   const requiredSpaceCompleted =
      //     requiredSpace.currentScore >= requiredSpace.requiredScore;
      //   requiredSpaces.push({
      //     id: requiredSpaceID,
      //     isCompleted: requiredSpaceCompleted,
      //   });
      //   isAvailable = isAvailable && requiredSpaceCompleted;
      // });

      newSpaces.push({
        id: space.id,
        name: space.name,
        requiredSpaces: requiredSpaces,
        isAvailable: isAvailable,
        isCompleted: space.currentScore >= space.requiredScore,
      });
    });

    // sort spaces like this: completed, available, not available
    newSpaces.sort(this.sortLearningSpaces.bind(this));

    // set all values to ensure correct rendering
    this.viewModel.spaces.Value = newSpaces;
  }

  private sortLearningSpaces(
    a: LearningSpaceSelectionLearningSpaceData,
    b: LearningSpaceSelectionLearningSpaceData
  ) {
    if (a.isCompleted && !b.isCompleted) return -1;
    else if (!a.isCompleted && b.isCompleted) return 1;
    else if (a.isAvailable && !b.isAvailable) return -1;
    else if (!a.isAvailable && b.isAvailable) return 1;
    return 0;
  }
}
