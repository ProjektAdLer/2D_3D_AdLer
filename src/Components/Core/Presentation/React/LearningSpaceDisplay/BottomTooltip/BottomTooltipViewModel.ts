import Observable from "../../../../../../Lib/Observable";
import { LearningElementTypeStrings } from "../../../../Domain/Types/LearningElementTypes";

export default class BottomTooltipViewModel {
  show = new Observable<boolean>(false, true);
  text = new Observable<string>("", true);
  iconType = new Observable<LearningElementTypeStrings>(undefined, true);
  points = new Observable<number>();
  showPoints = new Observable<boolean>(true, true);
}
