import IBreakTimeNotification from "src/Components/Core/Domain/BreakTimeNotifications/IBreakTimeNotification";
import IBreakTimeNotificationOverviewController from "./IBreakTimeNotificationOverviewController";
import BreakTimeNotificationOverviewViewModel from "./BreakTimeNotificationOverviewViewModel";

export default class BreakTimeNotificationOverviewController
  implements IBreakTimeNotificationOverviewController
{
  constructor(private viewModel: BreakTimeNotificationOverviewViewModel) {}

  selectNotification(notification: IBreakTimeNotification): void {
    this.viewModel.selectedNotification.Value = notification;
  }
}
