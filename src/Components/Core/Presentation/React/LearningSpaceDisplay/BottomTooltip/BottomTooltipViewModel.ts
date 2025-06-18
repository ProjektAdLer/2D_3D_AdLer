import { DoorTypeStrings } from "src/Components/Core/Domain/Types/DoorTypes";
import Observable from "../../../../../../Lib/Observable";
import { LearningElementTypeStrings } from "../../../../Domain/Types/LearningElementTypes";
import IElementCompletionDisplay from "../../../Utils/ElementCompletionDisplay/IElementCompletionDisplay";

export default class BottomTooltipViewModel {
  show = new Observable<boolean>(false, true);
  text = new Observable<string>("", true);
  iconType = new Observable<LearningElementTypeStrings | DoorTypeStrings>(
    undefined,
    true,
  );
  points = new Observable<number | undefined>();
  onClickCallback = new Observable<() => void>(undefined, true);
  hasScored = new Observable<boolean>(false);
  gradingStyle: IElementCompletionDisplay;
  xp = new Observable<number | undefined>();
  isRequired = new Observable<boolean | undefined>();
}
