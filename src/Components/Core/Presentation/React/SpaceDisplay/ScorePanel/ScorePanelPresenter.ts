import SpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/SpaceScoreTO";
import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import WorldScoreTO from "src/Components/Core/Application/DataTransferObjects/WorldScoreTO";
import IScorePanelPresenter from "./IScorePanelPresenter";
import ScorePanelViewModel from "./ScorePanelViewModel";

export default class ScorePanelPresenter implements IScorePanelPresenter {
  constructor(private viewModel: ScorePanelViewModel) {}

  onSpaceLoaded(spaceTO: SpaceTO): void {
    this.viewModel.currentSpaceID.Value = spaceTO.id;
  }
  onSpaceScored(spaceScoreTO: SpaceScoreTO): void {
    if (spaceScoreTO.spaceID === this.viewModel.currentSpaceID.Value) {
      this.viewModel.spaceScore.Value = spaceScoreTO.currentScore;
      this.viewModel.spaceRequiredScore.Value = spaceScoreTO.requiredScore;
      this.viewModel.spaceMaxScore.Value = spaceScoreTO.maxScore;
    }
  }
  onWorldScored(worldScoreTO: WorldScoreTO): void {
    this.viewModel.worldScore.Value = worldScoreTO.currentScore;
    this.viewModel.worldRequiredScore.Value = worldScoreTO.requiredScore;
    this.viewModel.worldMaxScore.Value = worldScoreTO.maxScore;
  }
}
