import INotificationManagerPresenter from "./INotificationManagerPresenter";
import NotificationManagerViewModel from "./NotificationManagerViewModel";

export type NotificationType = "error" | "notification";
export type ErrorMessage = {
  message: string;
  type: NotificationType;
};

export default class NotificationManagerPresenter
  implements INotificationManagerPresenter
{
  constructor(private viewModel: NotificationManagerViewModel) {}
  presentErrorMessage(message: string, type: NotificationType): void {
    this.viewModel.errors.Value = [
      ...this.viewModel.errors.Value,
      { message: message, type: type },
    ];
  }
}
