import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import NotificationManagerController from "./NotificationManagerController";
import NotificationManagerPresenter from "./NotificationManagerPresenter";
import NotificationManagerViewModel from "./NotificationManagerViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "../../../ViewModelProvider/ViewModelControllerProvider";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import IUIPort from "../../../../Ports/UIPort/IUIPort";
import INotificationManagerPresenter from "./INotificationManagerPresenter";
import INotificationManagerController from "./INotificationManagerController";

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
    CoreDIContainer.get<IUIPort>(PORT_TYPES.IUIPort).registerAdapter(
      this.presenter!
    );
  }
}
