import Observable from "../../../../../../Lib/Observable";

export default class LearningSpaceGoalPanelViewModel {
  public goals: Observable<string[]> = new Observable<string[]>();
  public isOpen: Observable<boolean> = new Observable<boolean>(false);
}
