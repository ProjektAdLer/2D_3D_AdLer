import { injectable } from "inversify";
import INotificationManagerPresenter from "../../Presentation/React/GeneralComponents/NotificationManager/INotificationManagerPresenter";
import IUIPort from "./IUIPort";
import { logger } from "src/Lib/Logger";
import { NotificationType } from "./IUIAdapter";

@injectable()
export default class UIPort implements IUIPort {
  private notificationManagerPresenter: INotificationManagerPresenter;

  displayNotification(errorMessage: string, type: NotificationType): void {
    if (!this.notificationManagerPresenter) {
      throw new Error("NotificationManagerPresenter is not registered");
    }

    this.notificationManagerPresenter.presentErrorMessage(errorMessage, type);
  }

  registerNotificationManager(presenter: INotificationManagerPresenter): void {
    if (this.notificationManagerPresenter) {
      logger.warn("NotificationManagerPresenter already registered");
    }
    this.notificationManagerPresenter = presenter;
  }
}
