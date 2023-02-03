import SpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/SpaceScoreTO";
import ISpaceCompletionModalPresenter from "./ISpaceCompletionModalPresenter";
import SpaceCompletionModalViewModel from "./SpaceCompletionModalViewModel";

export default class SpaceCompletionModalPresenter
  implements ISpaceCompletionModalPresenter
{
  constructor(private viewModel: SpaceCompletionModalViewModel) {}

  onSpaceScored(spaceScoreTO: SpaceScoreTO): void {
    this.viewModel.score.Value = spaceScoreTO.currentScore;
    this.viewModel.maxScore.Value = spaceScoreTO.maxScore;
    this.viewModel.requiredScore.Value = spaceScoreTO.requiredScore;
    if (spaceScoreTO.currentScore >= spaceScoreTO.requiredScore) {
      this.viewModel.showModal.Value = true;
    }
  }
}
