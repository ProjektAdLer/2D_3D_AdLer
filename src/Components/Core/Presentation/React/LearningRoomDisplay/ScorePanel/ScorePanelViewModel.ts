import Observable from "../../../../../../Lib/Observable";

export default class ScorePanelViewModel {
  public score: Observable<number> = new Observable(0);
}
