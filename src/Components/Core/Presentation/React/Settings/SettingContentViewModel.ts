import Observable from "src/Lib/Observable";

export default class SettingContentViewModel {
  volume: Observable<number> = new Observable<number>(50);

  graphicsQuality: Observable<number> = new Observable<number>(1);
  // graphics quality is inverse because of babylons hardware scaling, e.g. 1 is best resolution and 2 halfes resolution of the scene
  readonly minimumGraphicsQuality: number = 1;
  readonly maximumGraphicsQuality: number = 2;
  readonly minMaxGraphicsQuality: number =
    this.minimumGraphicsQuality + this.maximumGraphicsQuality;

  language: Observable<string> = new Observable<string>("de");

  highGraphicsQualityEnabled: Observable<boolean> = new Observable<boolean>(
    true,
  );

  breakTimeNotificationsEnabled: Observable<boolean> = new Observable<boolean>(
    true,
  );

  lightsEnabled: Observable<boolean> = new Observable<boolean>(true);

  changedSettings: boolean = false;
}
