import { IAbstractPort } from "./IAbstractPort";
import INotificationAdapter, {
  NotificationType,
} from "../NotificationPort/INotificationAdapter";
import IBreakTimeNotification from "../../../Domain/BreakTimeNotifications/IBreakTimeNotification";

export default interface INotificationPort
  extends IAbstractPort<INotificationAdapter> {
  displayNotification(errorMessage: string, type: NotificationType): void;
  displayBreakTimeNotification(
    notificationToDisplay: IBreakTimeNotification,
  ): void;
}
