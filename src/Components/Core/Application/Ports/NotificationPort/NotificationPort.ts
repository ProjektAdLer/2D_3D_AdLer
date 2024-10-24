import { injectable } from "inversify";
import INotificationPort from "../Interfaces/INotificationPort";
import INotificationAdapter from "./INotificationAdapter";
import type { NotificationType } from "./INotificationAdapter";
import AbstractPort from "../AbstractPort/AbstractPort";
import bind from "bind-decorator";
import type IBreakTimeNotification from "../../../Domain/BreakTimeNotifications/IBreakTimeNotification";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILoggerPort from "../Interfaces/ILoggerPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";

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
  onNotificationTriggered(
    type: NotificationType,
    logMessage: string,
    notificationMessage: string, // TODO: change type to NotificationMessages
  ): void {
    const logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);
    logger.log(type, logMessage);

    this.mappedAdapters.forEach((adapter) => {
      adapter.forEach((value) => {
        if (value.displayNotification)
          value.displayNotification(type, notificationMessage);
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
