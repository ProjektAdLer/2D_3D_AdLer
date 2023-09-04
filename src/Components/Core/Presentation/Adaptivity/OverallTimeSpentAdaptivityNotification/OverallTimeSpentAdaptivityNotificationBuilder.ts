import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import OveralTimeSpentNotificationController from "./OverallTimeSpentAdaptivityNotificationController";
import OveralTimeSpentNotificationPresenter from "./OverallTimeSpentAdaptivityNotificationPresenter";
import IOveralTimeSpentNotificationController from "./IOverallTimeSpentAdaptivityNotificationController";
import IOveralTimeSpentNotificationPresenter from "./IOverallTimeSpentAdaptivityNotificationPresenter";
import OveralTimeSpentNotificationViewModel from "./OverallTimeSpentAdaptivityNotificationViewModel";

@injectable()
export default class OveralTimeSpentNotificationBuilder extends PresentationBuilder<
  OveralTimeSpentNotificationViewModel,
  IOveralTimeSpentNotificationController,
  undefined,
  IOveralTimeSpentNotificationPresenter
> {
  constructor() {
    super(
      OveralTimeSpentNotificationViewModel,
      OveralTimeSpentNotificationController,
      undefined,
      OveralTimeSpentNotificationPresenter
    );
  }
}
