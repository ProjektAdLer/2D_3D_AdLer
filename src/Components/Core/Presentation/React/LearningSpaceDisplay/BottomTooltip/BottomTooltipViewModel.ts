import { DoorTypeStrings } from "src/Components/Core/Domain/Types/DoorTypes";
import Observable from "../../../../../../Lib/Observable";
import { LearningElementTypeStrings } from "../../../../Domain/Types/LearningElementTypes";

export default class BottomTooltipViewModel {
  show = new Observable<boolean>(false, true);
  text = new Observable<string>("", true);
  iconType = new Observable<LearningElementTypeStrings | DoorTypeStrings>(
    undefined,
    true,
  );
  points = new Observable<number>();
  showPoints = new Observable<boolean>(true, true);
  onClickCallback = new Observable<() => void>(undefined, true);
  hasScored = new Observable<boolean>(false);
}
