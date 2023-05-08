import LearningSpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import LearningWorldScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldScoreTO";
import ILearningWorldScorePanelPresenter from "./ILearningWorldScorePanelPresenter";
import LearningWorldScorePanelViewModel from "./LearningWorldScorePanelViewModel";

export default class LearningWorldScorePanelPresenter
  implements ILearningWorldScorePanelPresenter
{
  constructor(private viewModel: LearningWorldScorePanelViewModel) {}

  onLearningWorldScored(worldScoreTO: LearningWorldScoreTO): void {
    this.viewModel.worldScore.Value = worldScoreTO.currentScore;
    this.viewModel.worldRequiredScore.Value = worldScoreTO.requiredScore;
    this.viewModel.worldMaxScore.Value = worldScoreTO.maxScore;
  }
}
