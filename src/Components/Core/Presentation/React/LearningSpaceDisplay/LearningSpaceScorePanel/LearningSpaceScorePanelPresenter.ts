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
    this.updateSpaceScoreInfo(
      spaceTO.currentScore,
      spaceTO.requiredScore,
      spaceTO.maxScore
    );
  }
  onLearningSpaceScored(spaceScoreTO: LearningSpaceScoreTO): void {
    this.updateSpaceScoreInfo(
      spaceScoreTO.currentScore,
      spaceScoreTO.requiredScore,
      spaceScoreTO.maxScore
    );
  }

  private updateSpaceScoreInfo(
    currentScore: number,
    requiredScore: number,
    maxScore: number
  ) {
    this.viewModel.scoreInfo.Value = {
      currentScore: currentScore,
      requiredScore: requiredScore,
      maxScore: maxScore,
    };
  }
}
