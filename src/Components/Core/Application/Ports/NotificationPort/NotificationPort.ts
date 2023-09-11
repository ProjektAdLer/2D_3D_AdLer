import { injectable } from "inversify";
import INotificationPort from "../Interfaces/INotificationPort";
import INotificationAdapter, { NotificationType } from "./INotificationAdapter";
import AbstractPort from "../AbstractPort/AbstractPort";
import { OverallTimeSpentAdaptivityNotificationBreakType } from "src/Components/Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";

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

  displayOverallTimeSpentAdaptivityNotification(
    type: OverallTimeSpentAdaptivityNotificationBreakType
  ): void {
    this.adapters.forEach((adapter) => {
      if (adapter.displayOverallTimeSpentAdaptivityNotification)
        adapter.displayOverallTimeSpentAdaptivityNotification(type);
    });
  }
}
