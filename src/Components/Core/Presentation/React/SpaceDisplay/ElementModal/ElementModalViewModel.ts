import { ElementID } from "../../../../Domain/Types/EntityTypes";
import Observable from "../../../../../../Lib/Observable";
import AbstractElement from "../../../../Domain/Entities/ElementData/AbstractElementData";

export default class ElementModalViewModel<
  T extends AbstractElement = AbstractElement
> {
  id: Observable<number> = new Observable<ElementID>();
  parentCourseId: Observable<ElementID> = new Observable<ElementID>();
  isOpen: Observable<boolean> = new Observable<boolean>(false);
  public elementData = new Observable<T>();
}
