import { injectable } from "inversify";
import INotificationPort from "../Interfaces/INotificationPort";
import INotificationAdapter from "./INotificationAdapter";
import type { NotificationType } from "./INotificationAdapter";
import AbstractPort from "../AbstractPort/AbstractPort";
import { BreakTimeNotificationType } from "src/Components/Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";
import bind from "bind-decorator";

@injectable()
export default class NotificationPort
  extends AbstractPort<INotificationAdapter>
  implements INotificationPort
{
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
  displayBreakTimeNotification(type: BreakTimeNotificationType): void {
    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.displayBreakTimeNotification)
          value.displayBreakTimeNotification(type);
      });
    });
  }
}
