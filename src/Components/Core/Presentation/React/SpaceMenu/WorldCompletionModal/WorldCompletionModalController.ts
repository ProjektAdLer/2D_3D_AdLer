import IWorldCompletionModalController from "./IWorldCompletionModalController";
import WorldCompletionModalViewModel from "./WorldCompletionModalViewModel";

export default class WorldCompletionModalController
  implements IWorldCompletionModalController
{
  constructor(private viewModel: WorldCompletionModalViewModel) {}

  CloseButtonClicked(): void {
    this.viewModel.showModal.Value = false;
  }
}
