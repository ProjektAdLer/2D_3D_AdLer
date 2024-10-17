import IBreakTimeNotification from "../../../Domain/BreakTimeNotifications/IBreakTimeNotification";

export type NotificationType = "error" | "notification";
export type ErrorMessage = {
  message: string;
  type: NotificationType;
};

export default interface INotificationAdapter {
  displayNotification?(errorMessage: string, type: NotificationType): void;
  displayBreakTimeNotification?(
    notificationToDisplay: IBreakTimeNotification,
  ): void;
}
