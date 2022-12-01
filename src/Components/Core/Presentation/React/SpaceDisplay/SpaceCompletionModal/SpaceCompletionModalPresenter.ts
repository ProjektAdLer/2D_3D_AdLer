import SpaceTO from "../../../../Application/DataTransferObjects/SpaceTO";
import ISpaceCompletionModalPresenter from "./ISpaceCompletionModalPresenter";
import SpaceCompletionModalViewModel from "./SpaceCompletionModalViewModel";

export default class SpaceCompletionModalPresenter
  implements ISpaceCompletionModalPresenter
{
  constructor(private viewModel: SpaceCompletionModalViewModel) {}

  onSpaceLoaded(spaceTO: SpaceTO): void {}

  onScoreChanged(
    score: number,
    requiredScore: number,
    maxScore: number,
    spaceID: number
  ): void {
    this.viewModel.score.Value = score;
    this.viewModel.maxScore.Value = maxScore;
    this.viewModel.requiredScore.Value = requiredScore;
    if (score >= requiredScore) {
      this.viewModel.showModal.Value = true;
    }
  }
}
