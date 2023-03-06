import { ComponentID } from "../../../../Domain/Types/EntityTypes";
import Observable from "../../../../../../Lib/Observable";

export default class ElementModalViewModel {
  id: Observable<number> = new Observable<ComponentID>();
  isOpen: Observable<boolean> = new Observable<boolean>(false);
  name: Observable<string> = new Observable<string>();
  type = new Observable<string>();
  filePath = new Observable<string>();

  parentSpaceID = new Observable<ComponentID>();
  parentWorldID = new Observable<ComponentID>();
}
