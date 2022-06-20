import { NotificationType } from "../../Presentation/React/ModalManager/ModalManagerPresenter";
import { injectable } from "inversify";
import { LearningElementTO } from "../../Application/LoadWorld/ILearningWorldPort";
import IBottomTooltipPresenter from "../../Presentation/React/BottomTooltip/IBottomTooltipPresenter";
import IModalManagerPresenter from "../../Presentation/React/ModalManager/IModalManagerPresenter";
import IUIPort from "./IUIPort";

@injectable()
export default class UIPort implements IUIPort {
  private bottomTooltipPresenter: IBottomTooltipPresenter;
  private modalManagerPresenter: IModalManagerPresenter;

  displayModal(errorMessage: string, type: NotificationType): void {
    this.modalManagerPresenter.presentErrorMessage(errorMessage, type);
  }
  hide(): void {
    this.bottomTooltipPresenter.hide();
  }
  displayLearningElementTooltip = (learningElement: LearningElementTO) => {
    this.bottomTooltipPresenter.displayLearningElement(learningElement);
  };

  // Setter for presenters
  registerBottomTooltipPresenter(
    bottomTooltipPresenter: IBottomTooltipPresenter
  ): void {
    if (this.bottomTooltipPresenter) {
      throw new Error("BottomTooltipPresenter already registered");
    }
    this.bottomTooltipPresenter = bottomTooltipPresenter;
  }

  registerModalManager(presenter: IModalManagerPresenter): void {
    if (this.modalManagerPresenter) {
      throw new Error("ModalManagerPresenter already registered");
    }
    this.modalManagerPresenter = presenter;
  }
}
