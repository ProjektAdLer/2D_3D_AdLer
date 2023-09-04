import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import OveralTimeSpentAdaptivityNotificationController from "./OverallTimeSpentAdaptivityNotificationController";
import OverallTimeSpentAdaptivityNotificationPresenter from "./OverallTimeSpentAdaptivityNotificationPresenter";
import IOverallTimeSpentAdaptivityNotificationController from "./IOverallTimeSpentAdaptivityNotificationController";
import IOverallTimeSpentAdaptivityNotificationPresenter from "./IOverallTimeSpentAdaptivityNotificationPresenter";
import OverallTimeSpentAdaptivityNotificationViewModel from "./OverallTimeSpentAdaptivityNotificationViewModel";

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
}
