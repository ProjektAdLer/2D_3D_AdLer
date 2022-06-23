import { NotificationType } from "../../Presentation/React/ModalManager/ModalManagerPresenter";
import IBottomTooltipPresenter from "../../Presentation/React/BottomTooltip/IBottomTooltipPresenter";
import IModalManagerPresenter from "../../Presentation/React/ModalManager/IModalManagerPresenter";
import { LearningComponentID } from "../../Types/EnitityTypes";
import { LearningElementType } from "../../Presentation/Babylon/LearningElement/Types/LearningElementTypes";

export default interface IUIPort {
  registerModalManager(presenter: IModalManagerPresenter): void;
  displayModal(errorMessage: string, type: NotificationType): void;
  displayLearningElementTooltip(
    learningElement: LearningElementTooltipTO
  ): void;
  hide(): void;
  registerBottomTooltipPresenter(
    bottomTooltipPresenter: IBottomTooltipPresenter
  ): void;
}

export class LearningElementTooltipTO {
  id: LearningComponentID;
  type: LearningElementType;
  name: string;
}
