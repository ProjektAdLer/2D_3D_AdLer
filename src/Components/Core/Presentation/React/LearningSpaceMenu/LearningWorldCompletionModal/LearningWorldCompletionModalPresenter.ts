import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
import ILearningWorldCompletionModalPresenter from "./ILearningWorldCompletionModalPresenter";
import LearningWorldCompletionModalViewModel from "./LearningWorldCompletionModalViewModel";
import ISetWorldCompletionModalToShownUseCase from "src/Components/Core/Application/UseCases/SetWorldCompletionModalToShown/ISetWorldCompletionModalToShownUseCase";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import LearningSpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import LearningWorldScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldScoreTO";

export default class LearningWorldCompletionModalPresenter
  implements ILearningWorldCompletionModalPresenter
{
  private setWorldCompletionModalToShown: ISetWorldCompletionModalToShownUseCase;
  constructor(private viewModel: LearningWorldCompletionModalViewModel) {
    this.setWorldCompletionModalToShown = CoreDIContainer.get(
      USECASE_TYPES.ISetWorldCompletionModalToShownUseCase,
    );
  }

  onLearningWorldLoaded(world: LearningWorldTO): void {
    if (!world.completionModalShown) {
      this.viewModel.showModal.Value = world.spaces.every(
        (space) => space.currentScore >= space.requiredScore,
      );
      this.viewModel.evaluationLink.Value = world.evaluationLink;
      this.viewModel.currentWorldId.Value = world.id;
    }
  }

  onLearningWorldScored(learningWorldScoreTO: LearningWorldScoreTO): void {
    this.viewModel.showModal.Value =
      learningWorldScoreTO.currentScore >= learningWorldScoreTO.requiredScore;
  }
}
