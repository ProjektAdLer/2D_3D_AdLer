import Observable from "../../../../../../Lib/Observable";

export default class IntroStoryElementViewModel {
  texts: Observable<string[]> = new Observable<string[]>([]);
  isOpen: Observable<boolean> = new Observable<boolean>(false);
}
