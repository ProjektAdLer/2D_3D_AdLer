import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
import ILearningWorldCompletionModalPresenter from "./ILearningWorldCompletionModalPresenter";
import LearningWorldCompletionModalViewModel from "./LearningWorldCompletionModalViewModel";

export default class LearningWorldCompletionModalPresenter
  implements ILearningWorldCompletionModalPresenter
{
  constructor(private viewModel: LearningWorldCompletionModalViewModel) {}

  onLearningWorldLoaded(world: LearningWorldTO): void {
    this.viewModel.showModal.Value = world.spaces.every(
      (space) => space.currentScore >= space.requiredScore
    );
  }
}
