import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import HelpDeskButtonController from "./HelpDeskButtonController";
import HelpDeskButtonViewModel from "./HelpDeskButtonViewModel";
import IHelpDeskButtonController from "./IHelpDeskButtonController";

export default class HelpDeskButtonBuilder extends PresentationBuilder<
  HelpDeskButtonViewModel,
  IHelpDeskButtonController,
  undefined,
  undefined
> {
  constructor() {
    super(
      HelpDeskButtonViewModel,
      HelpDeskButtonController,
      undefined,
      undefined
    );
  }
}
