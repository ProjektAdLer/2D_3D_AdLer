import IBreakTimeNotification from "src/Components/Core/Domain/BreakTimeNotifications/IBreakTimeNotification";

export default class BreakTimeNotificationOverviewViewModel {
  shortBreakTimeNotifications: IBreakTimeNotification[];
  mediumBreakTimeNotifications: IBreakTimeNotification[];
  longBreakTimeNotifications: IBreakTimeNotification[];
}
