import IBreakTimeNotification from "src/Components/Core/Domain/BreakTimeNotifications/IBreakTimeNotification";
import Observable from "src/Lib/Observable";

export default class BreakTimeNotificationOverviewViewModel {
  showModal = new Observable<boolean>(false);

  shortBreakTimeNotifications: IBreakTimeNotification[];
  mediumBreakTimeNotifications: IBreakTimeNotification[];
  longBreakTimeNotifications: IBreakTimeNotification[];
}
