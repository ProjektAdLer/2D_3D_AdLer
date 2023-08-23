import HelpDeskModalViewModel from "./HelpDeskModalViewModel";
import IHelpDeskModalPresenter from "./IHelpDeskModalPresenter";
import { injectable } from "inversify";

@injectable()
export default class HelpDeskModalPresenter implements IHelpDeskModalPresenter {
  constructor(private viewModel: HelpDeskModalViewModel) {}
  openModal() {
    this.viewModel.isOpen.Value = true;
  }
}
