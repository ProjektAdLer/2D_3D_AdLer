import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import LMSButtonPresenter from "./LMSButtonPresenter";
import LMSButtonViewModel from "./LMSButtonViewModel";
import ILMSButtonController from "./ILMSButtonController";
import LMSButtonController from "./LMSButtonController";

@injectable()
export default class LMSButtonBuilder extends PresentationBuilder<
  LMSButtonViewModel,
  ILMSButtonController,
  undefined,
  LMSButtonPresenter
> {
  constructor() {
    super(
      LMSButtonViewModel,
      LMSButtonController,
      undefined,
      LMSButtonPresenter
    );
  }
}
