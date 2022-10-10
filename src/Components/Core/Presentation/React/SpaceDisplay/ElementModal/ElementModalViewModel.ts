import { ElementID } from "../../../../Domain/Types/EntityTypes";
import Observable from "../../../../../../Lib/Observable";

export default class ElementModalViewModel {
  id: Observable<number> = new Observable<ElementID>();
  isOpen: Observable<boolean> = new Observable<boolean>(false);
  type = new Observable<string>();

  parentSpaceId = new Observable<ElementID>();
  parentCourseId = new Observable<ElementID>();
}
