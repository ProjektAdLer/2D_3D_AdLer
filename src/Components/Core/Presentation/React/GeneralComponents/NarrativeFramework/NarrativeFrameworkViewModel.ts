import Observable from "src/Lib/Observable";

export default class NarrativeFrameworkViewModel {
  isOpen: Observable<boolean> = new Observable<boolean>(true);

  text: Observable<string> = new Observable<string>("Beispieltext");
}
