import { NotificationType } from "../../../../Application/Ports/NotificationPort/INotificationAdapter";
import INotificationManagerPresenter from "./INotificationManagerPresenter";
import NotificationManagerViewModel from "./NotificationManagerViewModel";

export default class NotificationManagerPresenter
  implements INotificationManagerPresenter
{
  constructor(private viewModel: NotificationManagerViewModel) {}
  displayNotification(type: NotificationType, message: string): void {
    this.viewModel.messages.Value = [
      ...this.viewModel.messages.Value,
      { message: message, type: type },
    ];
  }
}
