import bind from "bind-decorator";
import ILMSButtonController from "./ILMSButtonController";
import LMSButtonViewModel from "./LMSButtonViewModel";

export default class LMSButtonController implements ILMSButtonController {
  constructor(private viewModel: LMSButtonViewModel) {}

  @bind
  openLMSPage(): void {
    window.open(this.viewModel.LMSUrl);
  }
}
