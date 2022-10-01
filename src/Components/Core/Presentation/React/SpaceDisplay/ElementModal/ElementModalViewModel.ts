import { ElementID } from "../../../../Domain/Types/EntityTypes";
import Observable from "../../../../../../Lib/Observable";

export default class ElementModalViewModel {
  id: Observable<number> = new Observable<ElementID>();
  isOpen: Observable<boolean> = new Observable<boolean>(false);
  public type = new Observable<string>();
}
