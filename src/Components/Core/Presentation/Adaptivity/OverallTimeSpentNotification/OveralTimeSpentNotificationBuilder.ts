import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import OveralTimeSpentNotificationController from "./OveralTimeSpentNotificationController";
import OveralTimeSpentNotificationPresenter from "./OveralTimeSpentNotificationPresenter";
import IOveralTimeSpentNotificationController from "./IOveralTimeSpentNotificationController";
import IOveralTimeSpentNotificationPresenter from "./IOveralTimeSpentNotificationPresenter";
import OveralTimeSpentNotificationViewModel from "./OveralTimeSpentNotificationViewModel";

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
