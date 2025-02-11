import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
import ISideBarPresenter from "./ISideBarPresenter";
import SideBarViewModel from "./SideBarViewModel";
import LearningWorldScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldScoreTO";

export default class SideBarPresenter implements ISideBarPresenter {
  constructor(private viewModel: SideBarViewModel) {}

  onLearningWorldLoaded(world: LearningWorldTO): void {
    this.viewModel.allowWorldCompletionModalButtonClick = world.spaces.every(
      (space) => space.currentScore >= space.requiredScore,
    );
  }

  onLearningWorldScored(learningWorldScoreTO: LearningWorldScoreTO): void {
    this.viewModel.allowWorldCompletionModalButtonClick =
      learningWorldScoreTO.currentScore >= learningWorldScoreTO.requiredScore;
  }
}
