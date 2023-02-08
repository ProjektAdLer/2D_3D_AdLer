import { NotificationType } from "../../Presentation/React/GeneralComponents/NotificationManager/NotificationManagerPresenter";
import IBottomTooltipPresenter from "../../Presentation/React/SpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import INotificationManagerPresenter from "../../Presentation/React/GeneralComponents/NotificationManager/INotificationManagerPresenter";
import IExitModalPresenter from "~ReactComponents/SpaceDisplay/ExitModal/IExitModalPresenter";

export default interface IUIPort {
  registerNotificationManager(presenter: INotificationManagerPresenter): void;
  displayNotification(errorMessage: string, type: NotificationType): void;
  openExitModal(): void;
  registerExitModalPresenter(exitModalPresenter: IExitModalPresenter): void;
}
