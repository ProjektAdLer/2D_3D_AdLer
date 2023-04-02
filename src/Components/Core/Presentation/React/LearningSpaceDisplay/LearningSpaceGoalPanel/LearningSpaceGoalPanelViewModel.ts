import Observable from "../../../../../../Lib/Observable";

export default class LearningSpaceGoalPanelViewModel {
  public goals: Observable<string[]> = new Observable<string[]>([
    "Dies ist ein Testziel",
  ]);
}
