import { OverallTimeSpentAdaptivityNotificationBreakType } from "src/Components/Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
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
    this.viewModel.showMinimizedModal.Value = true;
  }
}
