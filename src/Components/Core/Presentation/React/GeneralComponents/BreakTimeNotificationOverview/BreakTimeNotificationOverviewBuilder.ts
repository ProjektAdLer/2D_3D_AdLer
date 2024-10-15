import { injectable } from "inversify";
import BreakTimeNotificationOverviewController from "./BreakTimeNotificationOverviewController";
import BreakTimeNotificationOverviewPresenter from "./BreakTimeNotificationOverviewPresenter";
import IBreakTimeNotificationOverviewController from "./IBreakTimeNotificationOverviewController";
import IBreakTimeNotificationOverviewPresenter from "./IBreakTimeNotificationOverviewPresenter";
import BreakTimeNotificationOverviewViewModel from "./BreakTimeNotificationOverviewViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";

/*
This Template Provides the whole scaffolding for a React Component.
Copy below lines in the DI Container and its Types

bind<IPresentationBuilder>(BUILDER_TYPES.IBreakTimeNotificationOverviewBuilder).to(BreakTimeNotificationOverviewBuilder);
IBreakTimeNotificationOverviewBuilder: Symbol("IBreakTimeNotificationOverviewBuilder"),

director.Builder = CoreDIContainer.get<IPresentationBuilder>(
  BUILDER_TYPES.IBreakTimeNotificationOverviewBuilder
);
director.build();
*/

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
}
