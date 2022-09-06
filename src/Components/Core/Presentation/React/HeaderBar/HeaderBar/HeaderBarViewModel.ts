import Observable from "src/Lib/Observable";

export default class HeaderBarViewModel {
  public title: Observable<string> = new Observable<string>("Lernwelt");
}
