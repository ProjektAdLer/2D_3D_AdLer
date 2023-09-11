import INotificationAdapter from "../../../Application/Ports/NotificationPort/INotificationAdapter";
import { OverallTimeSpentAdaptivityNotificationBreakType } from "src/Components/Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";

export default interface IOverallTimeSpentAdaptivityNotificationPresenter
  extends INotificationAdapter {
  displayOverallTimeSpentAdaptivityNotification(
    type: OverallTimeSpentAdaptivityNotificationBreakType
  ): void;
}
