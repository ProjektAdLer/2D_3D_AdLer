import { NotificationType } from "../../Presentation/React/GeneralComponents/NotificationManager/NotificationManagerPresenter";
import IBottomTooltipPresenter from "../../Presentation/React/SpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import INotificationManagerPresenter from "../../Presentation/React/GeneralComponents/NotificationManager/INotificationManagerPresenter";
import ElementTO from "../../Application/DataTransferObjects/ElementTO";
import IExitModalPresenter from "~ReactComponents/SpaceDisplay/ExitModal/IExitModalPresenter";

export default interface IUIPort {
  registerNotificationManager(presenter: INotificationManagerPresenter): void;
  displayNotification(errorMessage: string, type: NotificationType): void;
  displayExitQueryTooltip(): void;
  hideBottomTooltip(): void;
  registerBottomTooltipPresenter(
    bottomTooltipPresenter: IBottomTooltipPresenter
  ): void;
  openExitModal(): void;
  registerExitModalPresenter(exitModalPresenter: IExitModalPresenter): void;
}
