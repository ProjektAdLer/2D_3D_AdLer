import LearningSpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import LearningWorldScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldScoreTO";
import IScorePanelPresenter from "./IScorePanelPresenter";
import ScorePanelViewModel from "./ScorePanelViewModel";

export default class ScorePanelPresenter implements IScorePanelPresenter {
  constructor(private viewModel: ScorePanelViewModel) {}

  onSpaceLoaded(spaceTO: LearningSpaceTO): void {
    this.viewModel.currentSpaceID.Value = spaceTO.id;
    this.viewModel.spaceScore.Value = spaceTO.currentScore;
    this.viewModel.spaceRequiredScore.Value = spaceTO.requiredScore;
    this.viewModel.spaceMaxScore.Value = spaceTO.maxScore;
  }
  onSpaceScored(spaceScoreTO: LearningSpaceScoreTO): void {
    this.viewModel.spaceScore.Value = spaceScoreTO.currentScore;
    this.viewModel.spaceRequiredScore.Value = spaceScoreTO.requiredScore;
    this.viewModel.spaceMaxScore.Value = spaceScoreTO.maxScore;
  }
  onWorldScored(worldScoreTO: LearningWorldScoreTO): void {
    this.viewModel.worldScore.Value = worldScoreTO.currentScore;
    this.viewModel.worldRequiredScore.Value = worldScoreTO.requiredScore;
    this.viewModel.worldMaxScore.Value = worldScoreTO.maxScore;
  }
}
