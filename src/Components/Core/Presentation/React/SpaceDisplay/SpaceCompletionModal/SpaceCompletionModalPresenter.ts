import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";
import ISpaceCompletionModalPresenter from "./ISpaceCompletionModalPresenter";
import SpaceCompletionModalViewModel from "./SpaceCompletionModalViewModel";

export default class SpaceCompletionModalPresenter
  implements ISpaceCompletionModalPresenter, ISpaceAdapter
{
  constructor(private viewModel: SpaceCompletionModalViewModel) {}

  onSpaceDataLoaded(spaceTO: SpaceTO): void {}

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
