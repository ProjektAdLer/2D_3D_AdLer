import Observable from "../../../../../../Lib/Observable";

export default class SpaceGoalPanelViewModel {
  public goal: Observable<string> = new Observable<string>(
    "Dies ist ein Testziel"
  );
}
