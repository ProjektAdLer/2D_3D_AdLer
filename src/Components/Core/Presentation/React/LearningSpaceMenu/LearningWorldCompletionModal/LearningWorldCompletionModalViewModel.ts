import Observable from "src/Lib/Observable";

export default class LearningWorldCompletionModalViewModel {
  wasClosedOnce: boolean = false;
  showModal = new Observable<boolean>(false);
  isOtherModalOpen = new Observable<boolean>(false);

  evaluationLink = new Observable<string | null>();
  evaluationLinkName = new Observable<string | null>();
  evaluationLinkText = new Observable<string | null>();
  currentWorldId = new Observable<number>(0);
}
