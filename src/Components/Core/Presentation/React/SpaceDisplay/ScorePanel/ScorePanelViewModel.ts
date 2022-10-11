import Observable from "../../../../../../Lib/Observable";

export default class ScorePanelViewModel {
  score: Observable<number> = new Observable(0);
  requiredScore: Observable<number> = new Observable();
  maxScore: Observable<number> = new Observable();
}
