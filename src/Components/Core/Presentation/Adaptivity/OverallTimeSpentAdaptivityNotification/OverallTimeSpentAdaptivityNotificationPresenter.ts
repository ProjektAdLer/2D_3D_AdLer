import { OverallTimeSpentAdaptivityNotificationBreakType } from "src/Components/Core/Presentation/Adaptivity/OverallTimeSpentAdaptivityNotification/OverallTimeSpentAdaptivityNotificationViewModel";
import IOverallTimeSpentAdaptivityNotificationPresenter from "./IOverallTimeSpentAdaptivityNotificationPresenter";
import OverallTimeSpentAdaptivityNotificationViewModel from "./OverallTimeSpentAdaptivityNotificationViewModel";

// TODO: connect presenter with port to open modal
export default class OverallTimeSpentAdaptivityNotificationPresenter
  implements IOverallTimeSpentAdaptivityNotificationPresenter
{
  constructor(
    private viewModel: OverallTimeSpentAdaptivityNotificationViewModel
  ) {}

  updateOverallTimeSpentNotification(
    type: OverallTimeSpentAdaptivityNotificationBreakType
  ): void {
    this.viewModel.breakType.Value = type;
  }
}
