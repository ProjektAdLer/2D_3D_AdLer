import { injectable } from "inversify";
import INotificationPort from "../Interfaces/INotificationPort";
import INotificationAdapter, { NotificationType } from "./INotificationAdapter";
import AbstractPort from "../AbstractPort/AbstractPort";
import { BreakTimeNotificationType } from "src/Components/Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";

@injectable()
export default class NotificationPort
  extends AbstractPort<INotificationAdapter>
  implements INotificationPort
{
  displayNotification(errorMessage: string, type: NotificationType): void {
    this.adapters.forEach((adapter) => {
      if (adapter.displayNotification)
        adapter.displayNotification(errorMessage, type);
    });
  }

  displayBreakTimeNotification(type: BreakTimeNotificationType): void {
    this.adapters.forEach((adapter) => {
      if (adapter.displayBreakTimeNotification)
        adapter.displayBreakTimeNotification(type);
    });
  }
}
