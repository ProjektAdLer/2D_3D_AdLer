import { injectable } from "inversify";
import INotificationPort from "../Interfaces/INotificationPort";
import INotificationAdapter, { NotificationType } from "./INotificationAdapter";
import AbstractPort from "../AbstractPort/AbstractPort";

@injectable()
export default class UIPort
  extends AbstractPort<INotificationAdapter>
  implements INotificationPort
{
  displayNotification(errorMessage: string, type: NotificationType): void {
    this.adapters.forEach((adapter) => {
      if (adapter.displayNotification)
        adapter.displayNotification(errorMessage, type);
    });
  }
}
