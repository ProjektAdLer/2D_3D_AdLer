import IBreakTimeNotification from "src/Components/Core/Domain/BreakTimeNotifications/IBreakTimeNotification";

export default interface IBreakTimeNotificationOverviewController {
  selectNotification(notification: IBreakTimeNotification): void;
  returnToOverview(): void;
  closeModal(): void;
}
