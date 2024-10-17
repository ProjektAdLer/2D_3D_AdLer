import IBreakTimeNotification from "../../../Domain/BreakTimeNotifications/IBreakTimeNotification";
import INotificationAdapter from "../../../Application/Ports/NotificationPort/INotificationAdapter";

export default interface IBreakTimeNotificationPresenter
  extends INotificationAdapter {
  displayBreakTimeNotification(
    notificationToDisplay: IBreakTimeNotification,
  ): void;
}
