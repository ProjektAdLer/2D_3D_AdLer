import { NotificationType } from "../../Presentation/React/SpaceDisplay/ModalManager/ModalManagerPresenter";
import IBottomTooltipPresenter from "../../Presentation/React/SpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import IModalManagerPresenter from "../../Presentation/React/SpaceDisplay/ModalManager/IModalManagerPresenter";
import ElementTO from "../../Application/DataTransportObjects/ElementTO";

export default interface IUIPort {
  registerModalManager(presenter: IModalManagerPresenter): void;
  displayModal(errorMessage: string, type: NotificationType): void;
  displayElementTooltip(element: ElementTO): void;
  hideBottomTooltip(): void;
  registerBottomTooltipPresenter(
    bottomTooltipPresenter: IBottomTooltipPresenter
  ): void;
}
