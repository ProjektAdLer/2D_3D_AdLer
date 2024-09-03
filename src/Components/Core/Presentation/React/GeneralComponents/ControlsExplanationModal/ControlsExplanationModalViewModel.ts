import Observable from "src/Lib/Observable";

export default class ControlsExplanationModalViewModel {
  isOpen: Observable<boolean> = new Observable<boolean>(false);
}
