import { OverallTimeSpentAdaptivityNotificationBreakType } from "./../../../Presentation/Adaptivity/OverallTimeSpentAdaptivityNotification/OverallTimeSpentAdaptivityNotificationViewModel";
import { injectable } from "inversify";
import IUIPort from "../Interfaces/IUIPort";
import IUIAdapter, { NotificationType } from "./IUIAdapter";
import AbstractPort from "../AbstractPort/AbstractPort";

@injectable()
export default class UIPort
  extends AbstractPort<IUIAdapter>
  implements IUIPort
{
  displayNotification(errorMessage: string, type: NotificationType): void {
    this.adapters.forEach((adapter) => {
      if (adapter.displayNotification)
        adapter.displayNotification(errorMessage, type);
    });
  }

  updateOverallTimeSpentNotification(
    type: OverallTimeSpentAdaptivityNotificationBreakType
  ): void {
    this.adapters.forEach((adapter) => {
      if (adapter.updateOverallTimeSpentNotification)
        adapter.updateOverallTimeSpentNotification(type);
    });
  }
}
