import { NotificationType } from "../../Presentation/React/GeneralComponents/NotificationManager/NotificationManagerPresenter";
import { injectable } from "inversify";
import IBottomTooltipPresenter from "../../Presentation/React/SpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import INotificationManagerPresenter from "../../Presentation/React/GeneralComponents/NotificationManager/INotificationManagerPresenter";
import IUIPort from "./IUIPort";
import { logger } from "src/Lib/Logger";
import ElementTO from "../../Application/DataTransportObjects/ElementTO";

@injectable()
export default class UIPort implements IUIPort {
  private bottomTooltipPresenter: IBottomTooltipPresenter;
  private notificationManagerPresenter: INotificationManagerPresenter;

  displayNotification(errorMessage: string, type: NotificationType): void {
    if (!this.notificationManagerPresenter) {
      throw new Error("NotificationManagerPresenter is not registered");
    }

    this.notificationManagerPresenter.presentErrorMessage(errorMessage, type);
  }

  hideBottomTooltip(): void {
    if (!this.bottomTooltipPresenter) {
      throw new Error("BottomTooltipPresenter not registered");
    }

    this.bottomTooltipPresenter.hide();
  }

  displayElementTooltip = (element: ElementTO) => {
    if (!this.bottomTooltipPresenter) {
      throw new Error("BottomTooltipPresenter not registered");
    }

    this.bottomTooltipPresenter.displayElement(element);
  };

  // Setter for presenters
  registerBottomTooltipPresenter(
    bottomTooltipPresenter: IBottomTooltipPresenter
  ): void {
    if (this.bottomTooltipPresenter) {
      logger.warn("BottomTooltipPresenter already registered");
    }
    this.bottomTooltipPresenter = bottomTooltipPresenter;
  }

  registerNotificationManager(presenter: INotificationManagerPresenter): void {
    if (this.notificationManagerPresenter) {
      logger.warn("NotificationManagerPresenter already registered");
    }
    this.notificationManagerPresenter = presenter;
  }
}
