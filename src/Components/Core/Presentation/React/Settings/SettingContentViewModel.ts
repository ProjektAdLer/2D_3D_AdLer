import Observable from "src/Lib/Observable";

export default class SettingContentViewModel {
  volume: Observable<number> = new Observable<number>(50);

  language: Observable<string> = new Observable<string>("de");

  graphicsQuality: Observable<string> = new Observable<string>("high");

  changedSettings: boolean = false;
}
