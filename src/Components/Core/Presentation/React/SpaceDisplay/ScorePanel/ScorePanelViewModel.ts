import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import Observable from "../../../../../../Lib/Observable";

export default class ScorePanelViewModel {
  currentSpaceID: Observable<ComponentID> = new Observable();
  score: Observable<number> = new Observable(0);
  requiredScore: Observable<number> = new Observable();
  maxScore: Observable<number> = new Observable();
}
