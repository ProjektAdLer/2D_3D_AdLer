import Observable from "../../../../../../Lib/Observable";
import { ElementTypeStrings } from "../../../../Domain/Types/ElementTypes";

export default class BottomTooltipViewModel {
  show = new Observable<boolean>(false, true);
  text = new Observable<string>("", true);
  iconType = new Observable<ElementTypeStrings>(undefined, true);
  points = new Observable<number | undefined>();
}
