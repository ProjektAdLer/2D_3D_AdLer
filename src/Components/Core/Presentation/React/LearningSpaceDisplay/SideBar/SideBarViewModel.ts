import Observable from "src/Lib/Observable";

export default class SideBarViewModel {
  isDisabled: Observable<boolean> = new Observable<boolean>(false);
}
