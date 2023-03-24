import Observable from "src/Lib/Observable";

export default class MenuHeaderBarViewModel {
  public currentWorldName: Observable<string> = new Observable<string>();
}
