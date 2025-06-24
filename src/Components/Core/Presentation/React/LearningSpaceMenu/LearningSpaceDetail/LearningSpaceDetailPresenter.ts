import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import ILearningSpaceDetailPresenter from "./ILearningSpaceDetailPresenter";
import LearningSpaceDetailViewModel, {
  LearningSpaceDetailLearningSpaceData,
} from "./LearningSpaceDetailViewModel";
import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
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

    this.viewModel.completionDisplay = world.gradingStyle;

    // set all values at once to avoid multiple re-renders
    this.viewModel.spaces.Value = newSpaces;
  }

  onLearningSpaceLoaded(spaceTO: LearningSpaceTO): void {
    this.viewModel.id.Value = spaceTO.id;
    this.viewModel.name.Value = spaceTO.name;
    this.viewModel.description.Value = spaceTO.description;
    this.viewModel.goals.Value = spaceTO.goals;
    this.viewModel.isAvailable.Value = spaceTO.isAvailable;

    const elementsWithXP = spaceTO.elements.reduce(
      (result, elementTO) => {
        if (!elementTO) return result;

        result.push({
          type: elementTO.type,
          name: elementTO.name,
          hasScored: elementTO.hasScored,
          points: elementTO.value,
          isRequired: elementTO.isRequired,
          xp:
            (elementTO.difficulty?.baseXP ?? 0) *
            (elementTO.difficulty?.multiplicator ?? 1),
        });
        return result;
      },
      [] as (LearningElementInfo & { xp: number })[],
    );
    this.viewModel.elements.Value = elementsWithXP;

    this.viewModel.currentXP.Value = elementsWithXP
      .filter((e) => e.hasScored)
      .reduce((acc, element) => acc + (element.xp ?? 0), 0);

    this.viewModel.maxXP.Value = elementsWithXP.reduce(
      (acc, element) => acc + (element.xp ?? 0),
      0,
    );

    this.viewModel.completionDisplay = spaceTO.gradingStyle;
  }
}
