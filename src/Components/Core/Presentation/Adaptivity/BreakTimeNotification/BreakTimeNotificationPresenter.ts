import IBreakTimeNotificationPresenter from "./IBreakTimeNotificationPresenter";
import BreakTimeNotificationViewModel from "./BreakTimeNotificationViewModel";
import IBreakTimeNotification from "src/Components/Core/Domain/BreakTimeNotifications/IBreakTimeNotification";

export default class BreakTimeNotificationPresenter
  implements IBreakTimeNotificationPresenter
{
  constructor(private viewModel: BreakTimeNotificationViewModel) {}

  displayBreakTimeNotification(
    notificationToDisplay: IBreakTimeNotification,
  ): void {
    this.viewModel.notificationToDisplay.Value = notificationToDisplay;

    this.viewModel.showModal.Value = true;
    this.viewModel.showMinimizedModal.Value = true;
  }
}
