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
      spaceTO.currentScore ?? 0,
      spaceTO.requiredScore ?? 0,
      spaceTO.maxScore ?? 0,
    );
  }

  onLearningSpaceScored(spaceScoreTO: LearningSpaceScoreTO): void {
    this.updateSpaceScoreInfo(
      spaceScoreTO.currentScore,
      spaceScoreTO.requiredScore,
      spaceScoreTO.maxScore,
    );
  }

  private updateSpaceScoreInfo(
    currentScore: number,
    requiredScore: number,
    maxScore: number,
  ) {
    this.viewModel.scoreInfo.Value = {
      currentScore: currentScore ?? 0,
      requiredScore: requiredScore ?? 0,
      maxScore: maxScore ?? 0,
    };
  }
}
