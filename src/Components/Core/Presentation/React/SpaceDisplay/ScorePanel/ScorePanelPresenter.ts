import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";
import IScorePanelPresenter from "./IScorePanelPresenter";
import ScorePanelViewModel from "./ScorePanelViewModel";

export default class ScorePanelPresenter
  implements IScorePanelPresenter, ISpaceAdapter
{
  constructor(private viewModel: ScorePanelViewModel) {}

  onScoreChanged(score: number, requiredScore: number, maxScore: number): void {
    this.viewModel.score.Value = score;
    this.viewModel.requiredScore.Value = requiredScore;
    this.viewModel.maxScore.Value = maxScore;
  }

  onSpaceLoaded(spaceTO: SpaceTO): void {}
}
