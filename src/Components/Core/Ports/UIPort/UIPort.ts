import { NotificationType } from "../../Presentation/React/GeneralComponents/NotificationManager/NotificationManagerPresenter";
import { injectable } from "inversify";
import INotificationManagerPresenter from "../../Presentation/React/GeneralComponents/NotificationManager/INotificationManagerPresenter";
import IUIPort from "./IUIPort";
import { logger } from "src/Lib/Logger";
import IExitModalPresenter from "../../Presentation/React/SpaceDisplay/ExitModal/IExitModalPresenter";

@injectable()
export default class UIPort implements IUIPort {
  private notificationManagerPresenter: INotificationManagerPresenter;
  private exitModalPresenter: IExitModalPresenter;

  displayNotification(errorMessage: string, type: NotificationType): void {
    if (!this.notificationManagerPresenter) {
      throw new Error("NotificationManagerPresenter is not registered");
    }

    this.notificationManagerPresenter.presentErrorMessage(errorMessage, type);
  }

  openExitModal(): void {
    if (!this.exitModalPresenter) {
      throw new Error("ExitModalPresenter not registered");
    }

    this.exitModalPresenter.openExitModal();
  }

  // Setter for presenters
  registerNotificationManager(presenter: INotificationManagerPresenter): void {
    if (this.notificationManagerPresenter) {
      logger.warn("NotificationManagerPresenter already registered");
    }
    this.notificationManagerPresenter = presenter;
  }
  registerExitModalPresenter(exitModalPresenter: IExitModalPresenter): void {
    if (this.exitModalPresenter) {
      logger.warn("ExitModalPresenter already registered");
    }
    this.exitModalPresenter = exitModalPresenter;
  }
}
