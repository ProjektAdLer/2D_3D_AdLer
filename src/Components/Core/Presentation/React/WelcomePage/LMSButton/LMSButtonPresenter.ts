import { config } from "src/config";
import ILMSButtonPresenter from "./ILMSButtonPresenter";
import LMSButtonViewModel from "./LMSButtonViewModel";

export default class LMSButtonPresenter implements ILMSButtonPresenter {
  constructor(private viewModel: LMSButtonViewModel) {
    this.viewModel.moodleUrl = config.moodleURL;
  }
}
