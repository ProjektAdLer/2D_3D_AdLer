import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import LMSButtonViewModel from "./LMSButtonViewModel";
import ILMSButtonController from "./ILMSButtonController";
import LMSButtonController from "./LMSButtonController";
import { config } from "src/config";

@injectable()
export default class LMSButtonBuilder extends PresentationBuilder<
  LMSButtonViewModel,
  ILMSButtonController,
  undefined,
  undefined
> {
  constructor() {
    super(LMSButtonViewModel, LMSButtonController, undefined, undefined);
  }

  override buildViewModel(): void {
    super.buildViewModel();
    this.viewModel!.LMSUrl = config.moodleURL;
  }
}
