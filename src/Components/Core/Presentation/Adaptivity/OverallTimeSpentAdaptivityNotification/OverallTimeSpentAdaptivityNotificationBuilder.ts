import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import OveralTimeSpentAdaptivityNotificationController from "./OverallTimeSpentAdaptivityNotificationController";
import OverallTimeSpentAdaptivityNotificationPresenter from "./OverallTimeSpentAdaptivityNotificationPresenter";
import IOverallTimeSpentAdaptivityNotificationController from "./IOverallTimeSpentAdaptivityNotificationController";
import IOverallTimeSpentAdaptivityNotificationPresenter from "./IOverallTimeSpentAdaptivityNotificationPresenter";
import OverallTimeSpentAdaptivityNotificationViewModel from "./OverallTimeSpentAdaptivityNotificationViewModel";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IUIPort from "src/Components/Core/Application/Ports/Interfaces/IUIPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";

@injectable()
export default class OverallTimeSpentAdaptivityNotificationBuilder extends PresentationBuilder<
  OverallTimeSpentAdaptivityNotificationViewModel,
  IOverallTimeSpentAdaptivityNotificationController,
  undefined,
  IOverallTimeSpentAdaptivityNotificationPresenter
> {
  constructor() {
    super(
      OverallTimeSpentAdaptivityNotificationViewModel,
      OveralTimeSpentAdaptivityNotificationController,
      undefined,
      OverallTimeSpentAdaptivityNotificationPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<IUIPort>(PORT_TYPES.IUIPort).registerAdapter(
      this.presenter!
    );
  }
}
