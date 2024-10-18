import { IAbstractPort } from "./IAbstractPort";
import INotificationAdapter, {
  NotificationType,
} from "../NotificationPort/INotificationAdapter";
import { BreakTimeNotificationType } from "src/Components/Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";

export default interface INotificationPort
  extends IAbstractPort<INotificationAdapter> {
  onNotificationTriggered(
    type: NotificationType,
    logMessage: string,
    message: string,
  ): void;
  displayBreakTimeNotification(type: BreakTimeNotificationType): void;
}
