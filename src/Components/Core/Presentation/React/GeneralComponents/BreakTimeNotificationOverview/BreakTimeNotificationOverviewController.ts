import type IBreakTimeNotification from "src/Components/Core/Domain/BreakTimeNotifications/IBreakTimeNotification";
import IBreakTimeNotificationOverviewController from "./IBreakTimeNotificationOverviewController";
import BreakTimeNotificationOverviewViewModel from "./BreakTimeNotificationOverviewViewModel";
import bind from "bind-decorator";

export default class BreakTimeNotificationOverviewController
  implements IBreakTimeNotificationOverviewController
{
  constructor(private viewModel: BreakTimeNotificationOverviewViewModel) {}

  @bind
  selectNotification(notification: IBreakTimeNotification): void {
    this.viewModel.selectedNotification.Value = notification;
  }

  @bind
  returnToOverview(): void {
    this.viewModel.selectedNotification.Value = null;
  }

  @bind
  closeModal(): void {
    this.viewModel.showModal.Value = false;
    this.viewModel.selectedNotification.Value = null;
  }
}
