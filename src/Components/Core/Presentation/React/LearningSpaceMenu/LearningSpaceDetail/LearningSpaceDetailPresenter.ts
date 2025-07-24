import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import ILearningSpaceDetailPresenter from "./ILearningSpaceDetailPresenter";
import LearningSpaceDetailViewModel from "./LearningSpaceDetailViewModel";
import { LearningElementInfo } from "src/Components/Core/Domain/Types/LearningElementInfo";
import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";

export default class LearningSpaceDetailPresenter
  implements ILearningSpaceDetailPresenter
{
  constructor(private viewModel: LearningSpaceDetailViewModel) {}

  onLearningWorldLoaded(world: LearningWorldTO): void {
    this.viewModel.completionDisplay = world.gradingStyle;
  }

  onLearningSpaceLoaded(spaceTO: LearningSpaceTO): void {
    this.viewModel.id.Value = spaceTO.id;
    this.viewModel.name.Value = spaceTO.name;
    this.viewModel.description.Value = spaceTO.description;
    this.viewModel.goals.Value = spaceTO.goals;
    this.viewModel.isAvailable.Value = spaceTO.isAvailable;
    this.viewModel.requiredPoints.Value = spaceTO.requiredScore;

    const elements = spaceTO.elements.reduce((result, elementTO) => {
      if (!elementTO) return result;

      result.push({
        type: elementTO.type,
        name: elementTO.name,
        hasScored: elementTO.hasScored,
        points: elementTO.value,
        isRequired: elementTO.isRequired,
        difficultyInfo: elementTO.difficulty,
        estimatedTimeInMinutes: elementTO.estimatedTimeInMinutes,
      });
      return result;
    }, [] as LearningElementInfo[]);
    this.viewModel.elements.Value = elements;

    this.viewModel.currentXP.Value = elements
      .filter((e) => e.hasScored)
      .reduce(
        (acc, element) =>
          acc +
          (element.difficultyInfo?.baseXP ?? 0) *
            (element.difficultyInfo?.multiplicator ?? 1),
        0,
      );

    this.viewModel.maxXP.Value = elements.reduce(
      (acc, element) =>
        acc +
        (element.difficultyInfo?.baseXP ?? 0) *
          (element.difficultyInfo?.multiplicator ?? 1),
      0,
    );

    this.viewModel.accumulatedEstimatedTime.Value = elements.reduce(
      (acc, element) => acc + (element.estimatedTimeInMinutes ?? 0),
      0,
    );

    this.viewModel.completionDisplay = spaceTO.gradingStyle;
  }
}
