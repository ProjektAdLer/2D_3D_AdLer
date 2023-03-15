export type NotificationType = "error" | "notification";
export type ErrorMessage = {
  message: string;
  type: NotificationType;
};

export default interface IUIAdapter {
  displayNotification(errorMessage: string, type: NotificationType): void;
}
