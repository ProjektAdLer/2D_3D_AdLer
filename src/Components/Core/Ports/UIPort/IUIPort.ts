import { NotificationType } from "../../Presentation/React/LearningRoomDisplay/ModalManager/ModalManagerPresenter";
import IBottomTooltipPresenter from "../../Presentation/React/LearningRoomDisplay/BottomTooltip/IBottomTooltipPresenter";
import IModalManagerPresenter from "../../Presentation/React/LearningRoomDisplay/ModalManager/IModalManagerPresenter";
import LearningElementTO from "../../Application/DataTransportObjects/LearningElementTO";

export default interface IUIPort {
  registerModalManager(presenter: IModalManagerPresenter): void;
  displayModal(errorMessage: string, type: NotificationType): void;
  displayLearningElementTooltip(learningElement: LearningElementTO): void;
  hideBottomTooltip(): void;
  registerBottomTooltipPresenter(
    bottomTooltipPresenter: IBottomTooltipPresenter
  ): void;
}
