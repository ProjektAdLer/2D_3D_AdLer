import LearningWorldScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldScoreTO";
import ILearningWorldScorePanelPresenter from "./ILearningWorldScorePanelPresenter";
import LearningWorldScorePanelViewModel from "./LearningWorldScorePanelViewModel";
import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";

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

  onLearningWorldEntityLoaded(learningWorldTO: LearningWorldTO): void {
    let currentScore = 0;
    let requiredScore = 0;
    let maxScore = 0;

    learningWorldTO.spaces.forEach((space) => {
      requiredScore += space.requiredScore ?? 0;
      currentScore += space.elements.reduce((acc, curr) => {
        if (curr !== null) {
          acc += (curr?.value ?? 0) * (Number(curr?.hasScored) ?? 0);
        }
        return acc;
      }, 0);

      maxScore += space.elements.reduce((acc, curr) => {
        acc += curr?.value ?? 0;
        return acc;
      }, 0);
    });
    this.viewModel.scoreInfo.Value = {
      currentScore: currentScore,
      requiredScore: requiredScore,
      maxScore: maxScore,
    };
  }
}
