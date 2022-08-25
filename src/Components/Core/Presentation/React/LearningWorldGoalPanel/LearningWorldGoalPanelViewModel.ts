import Observable from "../../../../../Lib/Observable";

export default class LearningWorldGoalPanelViewModel {
  public worldGoal: Observable<string> = new Observable<string>(
    "Dies ist ein Test Goal"
  );
}
