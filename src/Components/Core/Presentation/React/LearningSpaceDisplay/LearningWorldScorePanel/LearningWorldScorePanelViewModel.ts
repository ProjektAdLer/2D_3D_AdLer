import Observable from "../../../../../../Lib/Observable";

export default class ScorePanelViewModel {
  worldScore: Observable<number> = new Observable();
  worldRequiredScore: Observable<number> = new Observable();
  worldMaxScore: Observable<number> = new Observable();
}
