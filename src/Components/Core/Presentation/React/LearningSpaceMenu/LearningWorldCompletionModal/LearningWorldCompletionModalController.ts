import ISetWorldCompletionModalToShownUseCase from "src/Components/Core/Application/UseCases/SetWorldCompletionModalToShown/ISetWorldCompletionModalToShownUseCase";
import ILearningWorldCompletionModalController from "./ILearningWorldCompletionModalController";
import LearningWorldCompletionModalViewModel from "./LearningWorldCompletionModalViewModel";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

export default class LearningWorldCompletionModalController
  implements ILearningWorldCompletionModalController
{
  private setWorldCompletionModalToShown: ISetWorldCompletionModalToShownUseCase;
  constructor(private viewModel: LearningWorldCompletionModalViewModel) {
    this.setWorldCompletionModalToShown = CoreDIContainer.get(
      USECASE_TYPES.ISetWorldCompletionModalToShownUseCase,
    );
  }

  CloseButtonClicked(): void {
    this.viewModel.showModal.Value = false;
    this.viewModel.wasClosedOnce = true;
    this.setWorldCompletionModalToShown.execute({
      worldID: this.viewModel.currentWorldId.Value,
    });
  }
}
