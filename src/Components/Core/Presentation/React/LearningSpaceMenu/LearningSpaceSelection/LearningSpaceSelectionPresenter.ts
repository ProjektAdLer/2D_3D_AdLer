import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
import ILearningSpaceSelectionPresenter from "./ILearningSpaceSelectionPresenter";
import LearningSpaceSelectionViewModel, {
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
      newSpaces.push({
        id: space.id,
        name: space.name,
        requirementsSyntaxTree: space.requirementsSyntaxTree,
        isAvailable: space.isAvailable,
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
