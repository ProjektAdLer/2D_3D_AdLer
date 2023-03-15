import { NotificationType } from "../../../../Application/Ports/UIPort/IUIAdapter";
import INotificationManagerPresenter from "./INotificationManagerPresenter";
import NotificationManagerViewModel from "./NotificationManagerViewModel";

export default class NotificationManagerPresenter
  implements INotificationManagerPresenter
{
  constructor(private viewModel: NotificationManagerViewModel) {}
  displayNotification(errorMessage: string, type: NotificationType): void {
    this.viewModel.errors.Value = [
      ...this.viewModel.errors.Value,
      { message: errorMessage, type: type },
    ];
  }
}
