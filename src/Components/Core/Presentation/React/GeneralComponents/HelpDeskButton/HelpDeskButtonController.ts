import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IHelpDeskModalPresenter from "../HelpDeskModal/IHelpDeskModalPresenter";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import IHelpDeskButtonController from "./IHelpDeskButtonController";
import bind from "bind-decorator";

export default class HelpDeskButtonController
  implements IHelpDeskButtonController
{
  private helpDeskModalPresenter: IHelpDeskModalPresenter;

  @bind
  onHelpDeskButtonClicked(): void {
    this.helpDeskModalPresenter = CoreDIContainer.get<IHelpDeskModalPresenter>(
      PRESENTATION_TYPES.IHelpDeskModalPresenter
    );
    this.helpDeskModalPresenter.openModal();
  }
}
