import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import OveralTimeSpentAdaptivityNotificationController from "./OverallTimeSpentAdaptivityNotificationController";
import OveralTimeSpentAdaptivityNotificationPresenter from "./OverallTimeSpentAdaptivityNotificationPresenter";
import IOveralTimeSpentAdaptivityNotificationController from "./IOverallTimeSpentAdaptivityNotificationController";
import IOveralTimeSpentAdaptivityNotificationPresenter from "./IOverallTimeSpentAdaptivityNotificationPresenter";
import OveralTimeSpentAdaptivityNotificationViewModel from "./OverallTimeSpentAdaptivityNotificationViewModel";

@injectable()
export default class OveralTimeSpentNotificationBuilder extends PresentationBuilder<
  OveralTimeSpentAdaptivityNotificationViewModel,
  IOveralTimeSpentAdaptivityNotificationController,
  undefined,
  IOveralTimeSpentAdaptivityNotificationPresenter
> {
  constructor() {
    super(
      OveralTimeSpentAdaptivityNotificationViewModel,
      OveralTimeSpentAdaptivityNotificationController,
      undefined,
      OveralTimeSpentAdaptivityNotificationPresenter
    );
  }
}
