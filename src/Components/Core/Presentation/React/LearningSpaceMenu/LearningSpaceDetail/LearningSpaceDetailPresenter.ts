import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import ILearningSpaceDetailPresenter from "./ILearningSpaceDetailPresenter";
import LearningSpaceDetailViewModel, {
  LearningSpaceDetailLearningSpaceData,
} from "./LearningSpaceDetailViewModel";
import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
import { LearningElementTypeStrings } from "src/Components/Core/Domain/Types/LearningElementTypes";

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

        result.push([
          elementTO.type,
          elementTO.name,
          elementTO.hasScored,
          elementTO.value,
        ]);
        return result;
      },
      [] as [LearningElementTypeStrings, string, boolean, number][]
    );

    this.viewModel.requiredPoints.Value = spaceTO.requiredScore;
  }
}
