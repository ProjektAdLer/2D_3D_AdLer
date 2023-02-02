import ISpaceCompletionModalController from "./ISpaceCompletionModalController";
import SpaceCompletionModalViewModel from "./SpaceCompletionModalViewModel";
import history from "history/browser";

export default class SpaceCompletionModalController
  implements ISpaceCompletionModalController
{
  constructor(private viewModel: SpaceCompletionModalViewModel) {}

  ReturnSpaceMenuButtonClicked(): void {
    history.push("/spacemenu");
  }

  CloseButtonClicked(): void {
    this.viewModel.showModal.Value = false;
    this.viewModel.wasClosedOnce = true;
  }
}
