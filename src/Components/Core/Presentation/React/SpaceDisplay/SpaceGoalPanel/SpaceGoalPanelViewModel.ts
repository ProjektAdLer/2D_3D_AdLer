import Observable from "../../../../../../Lib/Observable";

export default class SpaceGoalPanelViewModel {
  public goals: Observable<string[]> = new Observable<string[]>([
    "Dies ist ein Testziel",
  ]);
}
