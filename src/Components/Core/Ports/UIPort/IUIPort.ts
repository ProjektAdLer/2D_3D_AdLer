import INotificationManagerPresenter from "../../Presentation/React/GeneralComponents/NotificationManager/INotificationManagerPresenter";
import { NotificationType } from "./IUIAdapter";

export default interface IUIPort {
  registerNotificationManager(presenter: INotificationManagerPresenter): void;
  displayNotification(errorMessage: string, type: NotificationType): void;
}
