import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import ILearningSpaceDetailPresenter from "./ILearningSpaceDetailPresenter";
import LearningSpaceDetailViewModel, {
  LearningSpaceDetailLearningSpaceData,
} from "./LearningSpaceDetailViewModel";
import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
import { LearningElementTypeStrings } from "src/Components/Core/Domain/Types/LearningElementTypes";
import { LearningElementInfo } from "src/Components/Core/Domain/Types/LearningElementInfo";

export default class LearningSpaceDetailPresenter
  implements ILearningSpaceDetailPresenter
{
  constructor(private viewModel: LearningSpaceDetailViewModel) {}

  onLearningWorldLoaded(world: LearningWorldTO): void {
    let newSpaces: LearningSpaceDetailLearningSpaceData[] = [];

    world.spaces.forEach((space) => {
      newSpaces.push({
        id: space.id,
        name: space.name,
        isCompleted: space.currentScore >= space.requiredScore,
      });
    });

    // this.viewModel.completionDisplay = world.displayStrategy;

    // set all values at once to avoid multiple re-renders
    this.viewModel.spaces.Value = newSpaces;
  }

  onLearningSpaceLoaded(spaceTO: LearningSpaceTO): void {
    this.viewModel.id.Value = spaceTO.id;
    this.viewModel.name.Value = spaceTO.name;
    this.viewModel.description.Value = spaceTO.description;
    this.viewModel.goals.Value = spaceTO.goals;
    this.viewModel.isAvailable.Value = spaceTO.isAvailable;

    this.viewModel.elements.Value = spaceTO.elements.reduce(
      (result, elementTO) => {
        if (!elementTO) return result;

        result.push({
          type: elementTO.type,
          name: elementTO.name,
          hasScored: elementTO.hasScored,
          points: elementTO.value,
          isRequired: elementTO.isRequired,
        });
        return result;
      },
      [] as LearningElementInfo[],
    );

    this.viewModel.requiredPoints.Value = spaceTO.requiredScore;
  }
}
