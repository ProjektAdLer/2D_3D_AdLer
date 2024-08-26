import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import NotificationManagerController from "./NotificationManagerController";
import NotificationManagerPresenter from "./NotificationManagerPresenter";
import NotificationManagerViewModel from "./NotificationManagerViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import INotificationPort from "../../../../Application/Ports/Interfaces/INotificationPort";
import INotificationManagerPresenter from "./INotificationManagerPresenter";
import INotificationManagerController from "./INotificationManagerController";
import { History } from "~ReactComponents/ReactRelated/ReactEntryPoint/History";

@injectable()
export default class NotificationManagerBuilder extends PresentationBuilder<
  NotificationManagerViewModel,
  INotificationManagerController,
  undefined,
  INotificationManagerPresenter
> {
  constructor() {
    super(
      NotificationManagerViewModel,
      NotificationManagerController,
      undefined,
      NotificationManagerPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<INotificationPort>(
      PORT_TYPES.INotificationPort
    ).registerAdapter(this.presenter!, History.currentLocationScope());
  }
}
