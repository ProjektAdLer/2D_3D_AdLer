import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import HelpDeskModalViewModel from "./HelpDeskModalViewModel";
import HelpDeskModalPresenter from "./HelpDeskModalPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import IHelpDeskModalPresenter from "./IHelpDeskModalPresenter";

@injectable()
export default class HelpDeskModalBuilder extends PresentationBuilder<
  HelpDeskModalViewModel,
  undefined,
  undefined,
  IHelpDeskModalPresenter
> {
  constructor() {
    super(HelpDeskModalViewModel, undefined, undefined, HelpDeskModalPresenter);
  }

  override buildPresenter(): void {
    super.buildPresenter();
    // ensure that previous instances of the presenter are unbound, when changing between spaces
    if (CoreDIContainer.isBound(PRESENTATION_TYPES.IHelpDeskModalPresenter)) {
      CoreDIContainer.unbind(PRESENTATION_TYPES.IHelpDeskModalPresenter);
    }

    CoreDIContainer.bind<IHelpDeskModalPresenter>(
      PRESENTATION_TYPES.IHelpDeskModalPresenter
    ).toConstantValue(this.presenter!);
  }
}
