import OverallTimeSpentAdaptivityNotificationViewModel from "./OverallTimeSpentAdaptivityNotificationViewModel";
import IOverallTimeSpentAdaptivityNotificationController from "./IOverallTimeSpentAdaptivityNotificationController";

export default class OverallTimeSpentAdaptivityNotificationController
  implements IOverallTimeSpentAdaptivityNotificationController
{
  constructor(
    private viewModel: OverallTimeSpentAdaptivityNotificationViewModel
  ) {}

  closeBreakNotification(): void {
    this.viewModel.showModal.Value = false;
  }
}
