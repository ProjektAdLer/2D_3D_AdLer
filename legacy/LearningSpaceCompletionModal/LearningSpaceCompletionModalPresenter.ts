import LearningSpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import ILearningSpaceCompletionModalPresenter from "./ILearningSpaceCompletionModalPresenter";
import LearningSpaceCompletionModalViewModel from "./LearningSpaceCompletionModalViewModel";

export default class LearningSpaceCompletionModalPresenter
  implements ILearningSpaceCompletionModalPresenter
{
  constructor(private viewModel: LearningSpaceCompletionModalViewModel) {}

  onLearningSpaceLoaded(spaceTO: LearningSpaceTO): void {
    this.viewModel.currentSpaceID.Value = spaceTO.id;
  }

  onLearningSpaceScored(spaceScoreTO: LearningSpaceScoreTO): void {
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
