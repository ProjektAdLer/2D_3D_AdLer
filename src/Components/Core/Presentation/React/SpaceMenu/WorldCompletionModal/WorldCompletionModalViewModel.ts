import Observable from "src/Lib/Observable";

export default class WorldCompletionModalViewModel {
  wasClosedOnce: boolean = false;
  showModal = new Observable<boolean>(false);
}
