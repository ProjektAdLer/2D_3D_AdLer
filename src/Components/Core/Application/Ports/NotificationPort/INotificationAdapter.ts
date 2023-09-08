export type NotificationType = "error" | "notification";
export type ErrorMessage = {
  message: string;
  type: NotificationType;
};

export enum OverallTimeSpentAdaptivityNotificationBreakType {
  None,
  Short,
  Medium,
  Long,
}

export default interface INotificationAdapter {
  displayNotification?(errorMessage: string, type: NotificationType): void;
  displayOverallTimeSpentAdaptivityNotification?(
    type: OverallTimeSpentAdaptivityNotificationBreakType
  ): void;
}
