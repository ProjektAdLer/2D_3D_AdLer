import { NotificationType } from "../../Presentation/React/GeneralComponents/NotificationManager/NotificationManagerPresenter";
import INotificationManagerPresenter from "../../Presentation/React/GeneralComponents/NotificationManager/INotificationManagerPresenter";

export default interface IUIPort {
  registerNotificationManager(presenter: INotificationManagerPresenter): void;
  displayNotification(errorMessage: string, type: NotificationType): void;
}
