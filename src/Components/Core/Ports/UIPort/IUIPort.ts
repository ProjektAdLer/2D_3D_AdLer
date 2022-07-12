import { NotificationType } from "../../Presentation/React/ModalManager/ModalManagerPresenter";
import { LearningElementTO } from "../LearningWorldPort/ILearningWorldPort";
import IBottomTooltipPresenter from "../../Presentation/React/BottomTooltip/IBottomTooltipPresenter";
import IModalManagerPresenter from "../../Presentation/React/ModalManager/IModalManagerPresenter";

export default interface IUIPort {
  registerModalManager(presenter: IModalManagerPresenter): void;
  displayModal(errorMessage: string, type: NotificationType): void;
  displayLearningElementTooltip(learningElement: LearningElementTO): void;
  hide(): void;
  registerBottomTooltipPresenter(
    bottomTooltipPresenter: IBottomTooltipPresenter
  ): void;
}
