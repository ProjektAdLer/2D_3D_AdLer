import Observable from "src/Lib/Observable";

export default class LearningWorldCompletionModalViewModel {
  wasClosedOnce: boolean = false;
  showModal = new Observable<boolean>(false);
  evaluationLink = new Observable<string>("");
}
