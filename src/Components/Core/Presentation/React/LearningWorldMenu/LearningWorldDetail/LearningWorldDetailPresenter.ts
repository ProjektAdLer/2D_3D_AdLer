import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
import ILearningWorldDetailPresenter from "./ILearningWorldDetailPresenter";
import LearningWorldDetailViewModel from "./LearningWorldDetailViewModel";

export default class LearningWorldDetailPresenter
  implements ILearningWorldDetailPresenter
{
  constructor(private viewModel: LearningWorldDetailViewModel) {}
  onLearningWorldLoaded(world: LearningWorldTO): void {
    this.viewModel.spaces.Value = world.spaces;
    this.viewModel.name.Value = world.name;
    this.viewModel.description.Value = world.description;
    this.viewModel.goals.Value = world.goals;

    this.viewModel.estimatedTimeInMinutes.Value = world.spaces.reduce(
      (spaceAcc, space) =>
        spaceAcc +
        (space.elements.reduce(
          (elementAcc, element) =>
            elementAcc + (element?.estimatedTimeInMinutes ?? 0),
          0,
        ) ?? 0),
      0,
    );
  }
}
