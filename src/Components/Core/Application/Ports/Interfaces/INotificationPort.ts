import { IAbstractPort } from "./IAbstractPort";
import INotificationAdapter, {
  NotificationType,
} from "../NotificationPort/INotificationAdapter";
import { BreakTimeNotificationType } from "src/Components/Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";

export default interface INotificationPort
  extends IAbstractPort<INotificationAdapter> {
  displayNotification(errorMessage: string, type: NotificationType): void;
  displayBreakTimeNotification(type: BreakTimeNotificationType): void;
}
