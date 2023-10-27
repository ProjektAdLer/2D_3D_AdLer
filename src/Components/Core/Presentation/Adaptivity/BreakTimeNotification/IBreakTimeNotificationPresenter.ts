import INotificationAdapter from "../../../Application/Ports/NotificationPort/INotificationAdapter";
import { BreakTimeNotificationType } from "src/Components/Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";

export default interface IBreakTimeNotificationPresenter
  extends INotificationAdapter {
  displayBreakTimeNotification(type: BreakTimeNotificationType): void;
}
