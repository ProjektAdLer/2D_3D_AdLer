import INotificationAdapter, {
  OverallTimeSpentAdaptivityNotificationBreakType,
} from "../../../Application/Ports/NotificationPort/INotificationAdapter";

export default interface IOverallTimeSpentAdaptivityNotificationPresenter
  extends INotificationAdapter {
  displayOverallTimeSpentAdaptivityNotification(
    type: OverallTimeSpentAdaptivityNotificationBreakType
  ): void;
}
