import Observable from "src/Lib/Observable";

export default class LevelUpModalViewModel {
  isOpen: Observable<boolean> = new Observable<boolean>(false);
  timeToClose: number = 2500;
}
