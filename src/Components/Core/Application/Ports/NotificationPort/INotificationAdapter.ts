import { OverallTimeSpentAdaptivityNotificationBreakType } from "src/Components/Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";

export type NotificationType = "error" | "notification";
export type ErrorMessage = {
  message: string;
  type: NotificationType;
};

export default interface INotificationAdapter {
  displayNotification?(errorMessage: string, type: NotificationType): void;
  displayOverallTimeSpentAdaptivityNotification?(
    type: OverallTimeSpentAdaptivityNotificationBreakType
  ): void;
}
