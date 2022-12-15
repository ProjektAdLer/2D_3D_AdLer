import Observable from "../../../../../../Lib/Observable";

export default class SpaceCompletionModalViewModel {
  wasClosedOnce: boolean = false;
  showModal = new Observable<boolean>(false);
  score = new Observable<number>();
  maxScore = new Observable<number>(100);
  requiredScore = new Observable<number>();
}
