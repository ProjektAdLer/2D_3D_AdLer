import { NotificationType } from "../../Presentation/React/LearningRoomDisplay/ModalManager/ModalManagerPresenter";
import { injectable } from "inversify";
import IBottomTooltipPresenter from "../../Presentation/React/LearningRoomDisplay/BottomTooltip/IBottomTooltipPresenter";
import IModalManagerPresenter from "../../Presentation/React/LearningRoomDisplay/ModalManager/IModalManagerPresenter";
import IUIPort from "./IUIPort";
import { logger } from "src/Lib/Logger";
import LearningElementTO from "../../Application/DataTransportObjects/LearningElementTO";

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

  displayLearningElementTooltip = (learningElement: LearningElementTO) => {
    if (!this.bottomTooltipPresenter) {
      throw new Error("BottomTooltipPresenter not registered");
    }

    this.bottomTooltipPresenter.displayLearningElement(learningElement);
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
