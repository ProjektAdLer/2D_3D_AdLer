import ExitModalViewModel from "./ExitModalViewModel";
import IExitModalPresenter from "./IExitModalPresenter";

export default class ExitModalPresenter implements IExitModalPresenter {
  constructor(private viewModel: ExitModalViewModel) {}
  openExitModal(): void {
    this.viewModel.isOpen.Value = true;
  }
}
