import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
import ILearningWorldCompletionModalPresenter from "./ILearningWorldCompletionModalPresenter";
import LearningWorldCompletionModalViewModel from "./LearningWorldCompletionModalViewModel";
import LearningWorldScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldScoreTO";

export default class LearningWorldCompletionModalPresenter
  implements ILearningWorldCompletionModalPresenter
{
  constructor(private viewModel: LearningWorldCompletionModalViewModel) {}

  onLearningWorldLoaded(world: LearningWorldTO): void {
    if (!world.completionModalShown) {
      this.viewModel.showModal.Value = world.spaces.every(
        (space) => space.currentScore >= space.requiredScore,
      );
    }

    this.viewModel.evaluationLink.Value = world.evaluationLink;
    this.viewModel.currentWorldId.Value = world.id;
  }

  onLearningWorldScored(learningWorldScoreTO: LearningWorldScoreTO): void {
    this.viewModel.currentWorldId.Value = learningWorldScoreTO.worldID;
    let canShowModal =
      learningWorldScoreTO.currentScore >= learningWorldScoreTO.requiredScore;
    if (!this.viewModel.wasClosedOnce && canShowModal)
      this.viewModel.showModal.Value = true;
  }

  onLearningWorldEntityLoaded(world: LearningWorldTO): void {
    this.viewModel.showModal.Value = false;
    if (!world.completionModalShown) {
      this.viewModel.showModal.Value = world.spaces.every(
        (space) => space.currentScore >= space.requiredScore,
      );
    } else {
      this.viewModel.wasClosedOnce = true;
    }
    this.viewModel.evaluationLink.Value = world.evaluationLink;
    this.viewModel.currentWorldId.Value = world.id;
  }

  openModal(): void {
    this.viewModel.showModal.Value = true;
  }
}
