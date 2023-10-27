import { BreakTimeNotificationType } from "src/Components/Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";

export type NotificationType = "error" | "notification";
export type ErrorMessage = {
  message: string;
  type: NotificationType;
};

export default interface INotificationAdapter {
  displayNotification?(errorMessage: string, type: NotificationType): void;
  displayBreakTimeNotification?(type: BreakTimeNotificationType): void;
}
