import Observable from "../../../../../Lib/Observable";
import { LearningElementTO } from "../../../Ports/LearningWorldPort/ILearningWorldPort";

export default class BottomTooltipViewModel {
  show = new Observable<boolean>(false, true);
  text = new Observable<string>("", true);
  iconType = new Observable<string>("", true);
}
