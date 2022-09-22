import { NotificationType } from "../../Presentation/React/GeneralComponents/NotificationManager/NotificationManagerPresenter";
import IBottomTooltipPresenter from "../../Presentation/React/SpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import INotificationManagerPresenter from "../../Presentation/React/GeneralComponents/NotificationManager/INotificationManagerPresenter";
import ElementTO from "../../Application/DataTransferObjects/ElementTO";

export default interface IUIPort {
  registerNotificationManager(presenter: INotificationManagerPresenter): void;
  displayNotification(errorMessage: string, type: NotificationType): void;
  displayElementTooltip(element: ElementTO): void;
  hideBottomTooltip(): void;
  registerBottomTooltipPresenter(
    bottomTooltipPresenter: IBottomTooltipPresenter
  ): void;
}
