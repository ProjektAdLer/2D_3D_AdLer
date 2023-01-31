import Observable from "src/Lib/Observable";

export default class MenuHeaderBarViewModel {
  // TODO: replace default value when the title is set correctly
  public title: Observable<string> = new Observable<string>("Lernwelt");
}
