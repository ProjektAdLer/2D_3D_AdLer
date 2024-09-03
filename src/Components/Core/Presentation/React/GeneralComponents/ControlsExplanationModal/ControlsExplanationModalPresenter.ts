import IControlsExplanationModalPresenter from "./IControlsExplanationModalPresenter";
import ControlsExplanationModalViewModel from "./ControlsExplanationModalViewModel";

export default class ControlsExplanationModalPresenter
  implements IControlsExplanationModalPresenter
{
  constructor(private viewModel: ControlsExplanationModalViewModel) {}

  openModal(): void {
    this.viewModel.isOpen.Value = true;
  }
}
