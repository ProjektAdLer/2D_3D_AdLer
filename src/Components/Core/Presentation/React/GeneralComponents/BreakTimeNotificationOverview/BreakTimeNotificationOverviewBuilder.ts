import { injectable } from "inversify";
import BreakTimeNotificationOverviewController from "./BreakTimeNotificationOverviewController";
import BreakTimeNotificationOverviewPresenter from "./BreakTimeNotificationOverviewPresenter";
import IBreakTimeNotificationOverviewController from "./IBreakTimeNotificationOverviewController";
import IBreakTimeNotificationOverviewPresenter from "./IBreakTimeNotificationOverviewPresenter";
import BreakTimeNotificationOverviewViewModel from "./BreakTimeNotificationOverviewViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";

@injectable()
export default class BreakTimeNotificationOverviewBuilder extends PresentationBuilder<
  BreakTimeNotificationOverviewViewModel,
  IBreakTimeNotificationOverviewController,
  undefined,
  IBreakTimeNotificationOverviewPresenter
> {
  constructor() {
    super(
      BreakTimeNotificationOverviewViewModel,
      BreakTimeNotificationOverviewController,
      undefined,
      BreakTimeNotificationOverviewPresenter,
    );
  }

  buildPresenter(): void {
    super.buildPresenter();
    // ensure that previous instances of the presenter are unbound, when changing between spaces
    if (
      CoreDIContainer.isBound(
        PRESENTATION_TYPES.IBreakTimeNotificationOverviewPresenter,
      )
    )
      CoreDIContainer.unbind(
        PRESENTATION_TYPES.IBreakTimeNotificationOverviewPresenter,
      );

    CoreDIContainer.bind<IBreakTimeNotificationOverviewPresenter>(
      PRESENTATION_TYPES.IBreakTimeNotificationOverviewPresenter,
    ).toConstantValue(this.presenter!);
  }
}
