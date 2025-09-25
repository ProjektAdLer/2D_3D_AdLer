import Observable from "src/Lib/Observable";

export default class SettingContentViewModel {
  volume: Observable<number> = new Observable<number>(50);

  language: Observable<string> = new Observable<string>("de");

  highGraphicsQualityEnabled: Observable<boolean> = new Observable<boolean>(
    true,
  );

  breakTimeNotificationsEnabled: Observable<boolean> = new Observable<boolean>(
    true,
  );

  changedSettings: boolean = false;
}
