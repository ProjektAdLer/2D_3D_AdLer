import Observable from "../../../../../../Lib/Observable";

export default class HelpDeskModalViewModel {
  isOpen: Observable<boolean> = new Observable<boolean>(false);
  modalTitle: string = "Heeeeelp meeeee!";
}
