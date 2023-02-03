import SpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/SpaceScoreTO";
import IScorePanelPresenter from "./IScorePanelPresenter";
import ScorePanelViewModel from "./ScorePanelViewModel";

export default class ScorePanelPresenter implements IScorePanelPresenter {
  constructor(private viewModel: ScorePanelViewModel) {}

  onSpaceScored(spaceScoreTO: SpaceScoreTO): void {
    this.viewModel.score.Value = spaceScoreTO.currentScore;
    this.viewModel.requiredScore.Value = spaceScoreTO.requiredScore;
    this.viewModel.maxScore.Value = spaceScoreTO.maxScore;
  }
}
