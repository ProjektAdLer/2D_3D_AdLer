import Observable from "src/Lib/Observable";

export default class SpaceCompletionModalViewModel {
  showModal = new Observable<boolean>(false);
  score = new Observable<number>();
  maxScore = new Observable<number>(100);
  requiredScore = new Observable<number>();
}
