import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import LMSButtonPresenter from "./LMSButtonPresenter";
import LMSButtonViewModel from "./LMSButtonViewModel";

@injectable()
export default class LMSButtonBuilder extends PresentationBuilder<
  LMSButtonViewModel,
  undefined,
  undefined,
  LMSButtonPresenter
> {
  constructor() {
    super(LMSButtonViewModel, undefined, undefined, LMSButtonPresenter);
  }
}
