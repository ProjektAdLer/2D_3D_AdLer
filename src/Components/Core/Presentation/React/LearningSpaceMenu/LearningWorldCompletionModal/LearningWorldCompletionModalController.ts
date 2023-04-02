import ILearningWorldCompletionModalController from "./ILearningWorldCompletionModalController";
import LearningWorldCompletionModalViewModel from "./LearningWorldCompletionModalViewModel";

export default class LearningWorldCompletionModalController
  implements ILearningWorldCompletionModalController
{
  constructor(private viewModel: LearningWorldCompletionModalViewModel) {}

  CloseButtonClicked(): void {
    this.viewModel.showModal.Value = false;
    this.viewModel.wasClosedOnce = true;
  }
}
