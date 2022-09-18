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

@injectable()
export default class NotificationManagerBuilder extends PresentationBuilder<
  NotificationManagerViewModel,
  NotificationManagerController,
  undefined,
  NotificationManagerPresenter
> {
  constructor() {
    super(
      NotificationManagerViewModel,
      NotificationManagerController,
      undefined,
      NotificationManagerPresenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(
      this.viewModel,
      this.controller,
      NotificationManagerViewModel
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<IUIPort>(
      PORT_TYPES.IUIPort
    ).registerNotificationManager(this.presenter!);
  }
}
