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
    message: string,
  ): void;
  displayBreakTimeNotification(
    notificationToDisplay: IBreakTimeNotification,
  ): void;
}
