import { injectable } from "inversify";
import INotificationPort from "../Interfaces/INotificationPort";
import INotificationAdapter from "./INotificationAdapter";
import type { NotificationType } from "./INotificationAdapter";
import AbstractPort from "../AbstractPort/AbstractPort";
import bind from "bind-decorator";
import type IBreakTimeNotification from "../../../Domain/BreakTimeNotifications/IBreakTimeNotification";

@injectable()
export default class NotificationPort
  extends AbstractPort<INotificationAdapter>
  implements INotificationPort
{
  @bind
  name(): string {
    return "NOTIFICATION-PORT";
  }

  @bind
  displayNotification(errorMessage: string, type: NotificationType): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.displayNotification)
          value.displayNotification(errorMessage, type);
      });
    });
  }

  @bind
  displayBreakTimeNotification(
    notificationToDisplay: IBreakTimeNotification,
  ): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.displayBreakTimeNotification)
          value.displayBreakTimeNotification(notificationToDisplay);
      });
    });
  }
}
