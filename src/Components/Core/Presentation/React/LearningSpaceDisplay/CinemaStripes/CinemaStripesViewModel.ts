import Observable from "src/Lib/Observable";

export default class CinemaStripesViewModel {
  isOpen: Observable<boolean> = new Observable<boolean>(false);
}
