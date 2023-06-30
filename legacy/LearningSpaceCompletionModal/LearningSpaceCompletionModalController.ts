import ILearningSpaceCompletionModalController from "./ILearningSpaceCompletionModalController";
import LearningSpaceCompletionModalViewModel from "./LearningSpaceCompletionModalViewModel";
import history from "history/browser";

export default class LearningSpaceCompletionModalController
  implements ILearningSpaceCompletionModalController
{
  constructor(private viewModel: LearningSpaceCompletionModalViewModel) {}

  ReturnLearningSpaceMenuButtonClicked(): void {
    history.push("/spacemenu");
  }

  CloseButtonClicked(): void {
    this.viewModel.showModal.Value = false;
    this.viewModel.wasClosedOnce = true;
  }
}
