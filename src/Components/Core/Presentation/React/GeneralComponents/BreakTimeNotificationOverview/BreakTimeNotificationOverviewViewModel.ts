import {
  longBreakTimeNotificationContents,
  mediumBreakTimeNotificationContents,
  shortBreakTimeNotificationContents,
} from "src/Components/Core/Domain/BreakTimeNotifications/BreakTimeNotifications";
import IBreakTimeNotification from "src/Components/Core/Domain/BreakTimeNotifications/IBreakTimeNotification";
import Observable from "src/Lib/Observable";

export default class BreakTimeNotificationOverviewViewModel {
  showModal = new Observable<boolean>(false);
  selectedNotification = new Observable<IBreakTimeNotification | null>(null);

  // TODO: remove assignment of values to these variables with empty arrays
  shortBreakTimeNotifications: IBreakTimeNotification[] =
    shortBreakTimeNotificationContents;
  mediumBreakTimeNotifications: IBreakTimeNotification[] =
    mediumBreakTimeNotificationContents;
  longBreakTimeNotifications: IBreakTimeNotification[] =
    longBreakTimeNotificationContents;
}
