import { NotificationType } from "./NotificationManagerPresenter";
export default interface INotificationManagerPresenter {
  presentErrorMessage(message: string, type: NotificationType): void;
}
