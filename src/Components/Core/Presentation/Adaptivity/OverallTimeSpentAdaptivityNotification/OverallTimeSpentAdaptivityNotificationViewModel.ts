import Observable from "../../../../../Lib/Observable";

export enum OverallTimeSpentAdaptivityNotificationBreakType {
  None,
  Short,
  Medium,
  Long,
}

export default class OverallTimeSpentAdaptivityNotificationViewModel {
  showModal: Observable<boolean> = new Observable<boolean>(false);
  breakType: Observable<OverallTimeSpentAdaptivityNotificationBreakType> =
    new Observable<OverallTimeSpentAdaptivityNotificationBreakType>(
      OverallTimeSpentAdaptivityNotificationBreakType.None
    );
}
