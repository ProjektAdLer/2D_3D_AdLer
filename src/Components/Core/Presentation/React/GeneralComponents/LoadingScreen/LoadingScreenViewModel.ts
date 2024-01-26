import history from "history/browser";
import Observable from "../../../../../../Lib/Observable";

export default class LoadingScreenViewModel {
  isOpen: Observable<boolean> = new Observable<boolean>(true);
  isReadyToBeClosed: Observable<boolean> = new Observable<boolean>(false);
  loadingLocation: Observable<string> = new Observable<string>(
    history.location.pathname
  );
  loadStep: Observable<string> = new Observable<string>("");
}
