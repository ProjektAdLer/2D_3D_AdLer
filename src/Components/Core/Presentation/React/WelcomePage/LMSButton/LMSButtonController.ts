import ILMSButtonController from "./ILMSButtonController";
import LMSButtonViewModel from "./LMSButtonViewModel";

export default class LMSButtonController implements ILMSButtonController {
  constructor(private viewModel: LMSButtonViewModel) {}

  openLMSPage(): void {
    window.open(this.viewModel.moodleUrl);
  }
}
