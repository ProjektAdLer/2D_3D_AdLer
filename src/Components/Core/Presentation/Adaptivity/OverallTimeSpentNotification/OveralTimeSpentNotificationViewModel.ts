import Observable from "../../../../../Lib/Observable";

export default class OveralTimeSpentNotificationViewModel {
  showModal: Observable<boolean> = new Observable<boolean>(false);
}
