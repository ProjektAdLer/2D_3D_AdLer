import history from "~ReactEntryPoint/history";
import Observable from "../../../../../../Lib/Observable";
import { CursorState } from "src/Components/Core/Domain/Types/CursorStateTypes";

export default class LoadingScreenViewModel {
  isOpen: Observable<boolean> = new Observable<boolean>(true);
  isReadyToBeClosed: Observable<boolean> = new Observable<boolean>(false);
  loadingLocation: Observable<string> = new Observable<string>(
    history.location.pathname,
  );
  loadStep: Observable<string> = new Observable<string>("");
  cursorState: Observable<CursorState> = new Observable<CursorState>(
    CursorState.auto,
  );
}
