import Observable from "src/Lib/Observable";

export default class NarrativeFrameworkViewModel {
  isOpen: Observable<boolean> = new Observable<boolean>(true);

  introText?: string = "Beispieltext";
  outroText?: string = "Beispieltext";
}
