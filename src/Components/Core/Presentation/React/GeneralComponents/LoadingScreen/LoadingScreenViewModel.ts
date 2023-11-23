import Observable from "../../../../../../Lib/Observable";

export default class LoadingScreenViewModel {
  isOpen: Observable<boolean> = new Observable<boolean>(true);
  isReadyToBeClosed: Observable<boolean> = new Observable<boolean>(false);
  loadingLocation: string = "TestLocation";
  loadStep: Observable<string> = new Observable<string>("");
}
