import LearningSpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import ISpaceCompletionModalPresenter from "./ISpaceCompletionModalPresenter";
import SpaceCompletionModalViewModel from "./SpaceCompletionModalViewModel";

export default class SpaceCompletionModalPresenter
  implements ISpaceCompletionModalPresenter
{
  constructor(private viewModel: SpaceCompletionModalViewModel) {}

  onSpaceLoaded(spaceTO: LearningSpaceTO): void {
    this.viewModel.currentSpaceID.Value = spaceTO.id;
  }

  onSpaceScored(spaceScoreTO: LearningSpaceScoreTO): void {
    if (spaceScoreTO.spaceID === this.viewModel.currentSpaceID.Value) {
      this.viewModel.score.Value = spaceScoreTO.currentScore;
      this.viewModel.maxScore.Value = spaceScoreTO.maxScore;
      this.viewModel.requiredScore.Value = spaceScoreTO.requiredScore;
      if (spaceScoreTO.currentScore >= spaceScoreTO.requiredScore) {
        this.viewModel.showModal.Value = true;
      }
    }
  }
}
