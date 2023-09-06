import { OverallTimeSpentAdaptivityNotificationBreakType } from "src/Components/Core/Presentation/Adaptivity/OverallTimeSpentAdaptivityNotification/OverallTimeSpentAdaptivityNotificationViewModel";
import { IAbstractPort } from "./IAbstractPort";
import IUIAdapter, { NotificationType } from "../UIPort/IUIAdapter";

export default interface IUIPort extends IAbstractPort<IUIAdapter> {
  displayNotification(errorMessage: string, type: NotificationType): void;
  updateOverallTimeSpentNotification(
    type: OverallTimeSpentAdaptivityNotificationBreakType
  ): void;
}
