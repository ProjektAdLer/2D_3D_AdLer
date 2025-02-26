import { IAbstractPort } from "./IAbstractPort";
import INotificationAdapter, {
  NotificationType,
} from "../NotificationPort/INotificationAdapter";
import IBreakTimeNotification from "../../../Domain/BreakTimeNotifications/IBreakTimeNotification";

export default interface INotificationPort
  extends IAbstractPort<INotificationAdapter> {
  onNotificationTriggered(
    type: NotificationType,
    logMessage: string,
    notificationMessage: string, // TODO: Change type to NotificationMessages
  ): void;

  displayBreakTimeNotification(
    notificationToDisplay: IBreakTimeNotification,
  ): void;
}
