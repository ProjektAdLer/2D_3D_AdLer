import LearningWorldScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldScoreTO";
import ILearningWorldScorePanelPresenter from "./ILearningWorldScorePanelPresenter";
import LearningWorldScorePanelViewModel from "./LearningWorldScorePanelViewModel";

export default class LearningWorldScorePanelPresenter
  implements ILearningWorldScorePanelPresenter
{
  constructor(private viewModel: LearningWorldScorePanelViewModel) {}

  onLearningWorldScored(worldScoreTO: LearningWorldScoreTO): void {
    this.viewModel.scoreInfo.Value = {
      currentScore: worldScoreTO.currentScore ?? 0,
      requiredScore: worldScoreTO.requiredScore ?? 0,
      maxScore: worldScoreTO.maxScore ?? 0,
    };
  }
}
