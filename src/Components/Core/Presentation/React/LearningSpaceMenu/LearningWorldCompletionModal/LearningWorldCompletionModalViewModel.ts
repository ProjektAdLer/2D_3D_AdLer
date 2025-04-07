import Observable from "src/Lib/Observable";

export default class LearningWorldCompletionModalViewModel {
  wasClosedOnce: boolean = false;
  showModal = new Observable<boolean>(false);

  worldCompletionText: string;
  evaluationLink = new Observable<string>("");
  currentWorldId = new Observable<number>(0);
}
