import Observable from "src/Lib/Observable";

export default class ReturnHomeModalViewModel {
  isNoWorldAvailable: Observable<boolean> = new Observable<boolean>(false);
}
