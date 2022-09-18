import { NotificationType } from "../../Presentation/React/SpaceDisplay/ModalManager/ModalManagerPresenter";
import { injectable } from "inversify";
import IBottomTooltipPresenter from "../../Presentation/React/SpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import IModalManagerPresenter from "../../Presentation/React/SpaceDisplay/ModalManager/IModalManagerPresenter";
import IUIPort from "./IUIPort";
import { logger } from "src/Lib/Logger";
import ElementTO from "../../Application/DataTransportObjects/ElementTO";

@injectable()
export default class UIPort implements IUIPort {
  private bottomTooltipPresenter: IBottomTooltipPresenter;
  private modalManagerPresenter: IModalManagerPresenter;

  displayModal(errorMessage: string, type: NotificationType): void {
    if (!this.modalManagerPresenter) {
      throw new Error("ModalManagerPresenter is not registered");
    }

    this.modalManagerPresenter.presentErrorMessage(errorMessage, type);
  }

  hideBottomTooltip(): void {
    if (!this.bottomTooltipPresenter) {
      throw new Error("BottomTooltipPresenter not registered");
    }

    this.bottomTooltipPresenter.hide();
  }

  displayElementTooltip = (element: ElementTO) => {
    if (!this.bottomTooltipPresenter) {
      throw new Error("BottomTooltipPresenter not registered");
    }

    this.bottomTooltipPresenter.displayElement(element);
  };

  // Setter for presenters
  registerBottomTooltipPresenter(
    bottomTooltipPresenter: IBottomTooltipPresenter
  ): void {
    if (this.bottomTooltipPresenter) {
      logger.warn("BottomTooltipPresenter already registered");
    }
    this.bottomTooltipPresenter = bottomTooltipPresenter;
  }

  registerModalManager(presenter: IModalManagerPresenter): void {
    if (this.modalManagerPresenter) {
      logger.warn("ModalManagerPresenter already registered");
    }
    this.modalManagerPresenter = presenter;
  }
}
