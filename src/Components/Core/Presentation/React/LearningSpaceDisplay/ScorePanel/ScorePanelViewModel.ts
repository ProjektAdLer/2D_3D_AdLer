import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import Observable from "../../../../../../Lib/Observable";

export default class ScorePanelViewModel {
  currentSpaceID: Observable<ComponentID> = new Observable();
  spaceScore: Observable<number> = new Observable();
  spaceRequiredScore: Observable<number> = new Observable();
  spaceMaxScore: Observable<number> = new Observable();
  worldScore: Observable<number> = new Observable();
  worldRequiredScore: Observable<number> = new Observable();
  worldMaxScore: Observable<number> = new Observable();
}
