import Observable from "../../../../../Lib/Observable";
import { OverallTimeSpentAdaptivityNotificationBreakType } from "../../../Application/Ports/NotificationPort/INotificationAdapter";

export default class OverallTimeSpentAdaptivityNotificationViewModel {
  showModal: Observable<boolean> = new Observable<boolean>(false);
  breakType: Observable<OverallTimeSpentAdaptivityNotificationBreakType> =
    new Observable<OverallTimeSpentAdaptivityNotificationBreakType>(
      OverallTimeSpentAdaptivityNotificationBreakType.None
    );
}
