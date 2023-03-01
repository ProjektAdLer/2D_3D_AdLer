import SpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/SpaceScoreTO";
import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import ISpaceCompletionModalPresenter from "./ISpaceCompletionModalPresenter";
import SpaceCompletionModalViewModel from "./SpaceCompletionModalViewModel";

export default class SpaceCompletionModalPresenter
  implements ISpaceCompletionModalPresenter
{
  constructor(private viewModel: SpaceCompletionModalViewModel) {}

  onSpaceLoaded(spaceTO: SpaceTO): void {
    this.viewModel.currentSpaceID.Value = spaceTO.id;
  }
  onSpaceScored(spaceScoreTO: SpaceScoreTO): void {
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
