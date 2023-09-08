import { IAbstractPort } from "./IAbstractPort";
import INotificationAdapter, {
  NotificationType,
  OverallTimeSpentAdaptivityNotificationBreakType,
} from "../NotificationPort/INotificationAdapter";

export default interface INotificationPort
  extends IAbstractPort<INotificationAdapter> {
  displayNotification(errorMessage: string, type: NotificationType): void;
  displayOverallTimeSpentAdaptivityNotification(
    type: OverallTimeSpentAdaptivityNotificationBreakType
  ): void;
}
