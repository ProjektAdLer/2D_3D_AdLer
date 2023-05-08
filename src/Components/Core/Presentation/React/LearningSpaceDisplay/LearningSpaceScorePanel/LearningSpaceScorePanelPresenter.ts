import LearningSpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import ILearningSpaceScorePanelPresenter from "./ILearningSpaceScorePanelPresenter";
import LearningSpaceScorePanelViewModel from "./LearningSpaceScorePanelViewModel";

export default class LearningSpaceScorePanelPresenter
  implements ILearningSpaceScorePanelPresenter
{
  constructor(private viewModel: LearningSpaceScorePanelViewModel) {}

  onLearningSpaceLoaded(spaceTO: LearningSpaceTO): void {
    this.viewModel.currentSpaceID.Value = spaceTO.id;
    this.viewModel.spaceScore.Value = spaceTO.currentScore;
    this.viewModel.spaceRequiredScore.Value = spaceTO.requiredScore;
    this.viewModel.spaceMaxScore.Value = spaceTO.maxScore;
  }
  onLearningSpaceScored(spaceScoreTO: LearningSpaceScoreTO): void {
    this.viewModel.spaceScore.Value = spaceScoreTO.currentScore;
    this.viewModel.spaceRequiredScore.Value = spaceScoreTO.requiredScore;
    this.viewModel.spaceMaxScore.Value = spaceScoreTO.maxScore;
  }
}
