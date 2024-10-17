import Observable from "../../../../../Lib/Observable";
import IBreakTimeNotification from "src/Components/Core/Domain/BreakTimeNotifications/IBreakTimeNotification";

export default class BreakTimeNotificationViewModel {
  showModal: Observable<boolean> = new Observable<boolean>(false);
  showMinimizedModal: Observable<boolean> = new Observable<boolean>(false);

  notificationToDisplay: Observable<IBreakTimeNotification> =
    new Observable<IBreakTimeNotification>();
}
