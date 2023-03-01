import SpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/SpaceScoreTO";
import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import IScorePanelPresenter from "./IScorePanelPresenter";
import ScorePanelViewModel from "./ScorePanelViewModel";

export default class ScorePanelPresenter implements IScorePanelPresenter {
  constructor(private viewModel: ScorePanelViewModel) {}

  onSpaceLoaded(spaceTO: SpaceTO): void {
    this.viewModel.currentSpaceID.Value = spaceTO.id;
  }
  onSpaceScored(spaceScoreTO: SpaceScoreTO): void {
    if (spaceScoreTO.spaceID === this.viewModel.currentSpaceID.Value) {
      this.viewModel.score.Value = spaceScoreTO.currentScore;
      this.viewModel.requiredScore.Value = spaceScoreTO.requiredScore;
      this.viewModel.maxScore.Value = spaceScoreTO.maxScore;
    }
  }
}
