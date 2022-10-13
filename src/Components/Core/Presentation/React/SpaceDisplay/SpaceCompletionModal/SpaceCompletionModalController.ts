import ISpaceCompletionModalController from "./ISpaceCompletionModalController";
import SpaceCompletionModalViewModel from "./SpaceCompletionModalViewModel";
import history from "history/browser";

export default class SpaceCompletionModalController
  implements ISpaceCompletionModalController
{
  constructor(private viewModel: SpaceCompletionModalViewModel) {}

  ReturnWorldMenuButtonClicked(): void {
    history.push("/worldmenu");
  }

  CloseButtonClicked(): void {
    this.viewModel.showModal.Value = false;
  }
}
