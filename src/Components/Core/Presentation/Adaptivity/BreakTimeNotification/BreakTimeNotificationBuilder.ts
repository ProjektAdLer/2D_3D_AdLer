import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import OveralTimeSpentAdaptivityNotificationController from "./BreakTimeNotificationController";
import BreakTimeNotificationPresenter from "./BreakTimeNotificationPresenter";
import IBreakTimeNotificationController from "./IBreakTimeNotificationController";
import IBreakTimeNotificationPresenter from "./IBreakTimeNotificationPresenter";
import BreakTimeNotificationViewModel from "./BreakTimeNotificationViewModel";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import INotificationPort from "src/Components/Core/Application/Ports/Interfaces/INotificationPort";
import { History } from "~ReactComponents/ReactRelated/ReactEntryPoint/History";

@injectable()
export default class BreakTimeNotificationBuilder extends PresentationBuilder<
  BreakTimeNotificationViewModel,
  IBreakTimeNotificationController,
  undefined,
  IBreakTimeNotificationPresenter
> {
  constructor() {
    super(
      BreakTimeNotificationViewModel,
      OveralTimeSpentAdaptivityNotificationController,
      undefined,
      BreakTimeNotificationPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<INotificationPort>(
      PORT_TYPES.INotificationPort
    ).registerAdapter(this.presenter!, History.currentLocationScope());
  }
}
