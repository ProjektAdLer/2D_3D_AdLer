import { OverallTimeSpentAdaptivityNotificationBreakType } from "../../../Application/Ports/NotificationPort/INotificationAdapter";
import IOverallTimeSpentAdaptivityNotificationPresenter from "./IOverallTimeSpentAdaptivityNotificationPresenter";
import OverallTimeSpentAdaptivityNotificationViewModel from "./OverallTimeSpentAdaptivityNotificationViewModel";

export default class OverallTimeSpentAdaptivityNotificationPresenter
  implements IOverallTimeSpentAdaptivityNotificationPresenter
{
  constructor(
    private viewModel: OverallTimeSpentAdaptivityNotificationViewModel
  ) {}

  displayOverallTimeSpentAdaptivityNotification(
    type: OverallTimeSpentAdaptivityNotificationBreakType
  ): void {
    this.viewModel.breakType.Value = type;
    this.viewModel.showModal.Value = true;
  }
}
