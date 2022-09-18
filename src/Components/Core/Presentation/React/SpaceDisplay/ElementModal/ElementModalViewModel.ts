import { ElementID } from "../../../../Domain/Types/EntityTypes";
import Observable from "../../../../../../Lib/Observable";
import { ElementType } from "../../../Babylon/Elements/Types/ElementTypes";
import AbstractElement from "../../../../Domain/Entities/ElementData/AbstractElementData";

export default class ElementModalViewModel<
  T extends AbstractElement = AbstractElement
> {
  id: Observable<number> = new Observable<ElementID>();
  isOpen: Observable<boolean> = new Observable<boolean>(false);
  public elementData = new Observable<T>();
}
