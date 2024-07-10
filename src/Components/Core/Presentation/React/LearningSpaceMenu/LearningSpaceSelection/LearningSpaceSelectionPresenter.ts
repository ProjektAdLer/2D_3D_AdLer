import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
import ILearningSpaceSelectionPresenter from "./ILearningSpaceSelectionPresenter";
import LearningSpaceSelectionViewModel, {
  LearningSpaceSelectionLearningSpaceData,
} from "./LearningSpaceSelectionViewModel";
import ILoadLearningSpaceUseCase from "src/Components/Core/Application/UseCases/LoadLearningSpace/ILoadLearningSpaceUseCase";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

export default class LearningSpaceSelectionPresenter
  implements ILearningSpaceSelectionPresenter
{
  private loadLearningSpaceUseCase: ILoadLearningSpaceUseCase;
  constructor(private viewModel: LearningSpaceSelectionViewModel) {
    this.loadLearningSpaceUseCase = CoreDIContainer.get(
      USECASE_TYPES.ILoadLearningSpaceUseCase
    );
  }

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

    // set the initially selected space
    this.viewModel.selectedSpaceID.Value =
      world.lastVisitedSpaceID || newSpaces[0].id;
    this.loadLearningSpaceUseCase.executeAsync({
      spaceID: world.lastVisitedSpaceID || newSpaces[0].id,
      worldID: this.viewModel.worldID.Value,
    });
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
