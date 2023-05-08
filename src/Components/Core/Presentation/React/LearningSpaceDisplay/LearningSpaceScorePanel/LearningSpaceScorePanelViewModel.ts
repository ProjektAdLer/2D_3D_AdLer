import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import Observable from "../../../../../../Lib/Observable";

export default class LearningSpaceScorePanelViewModel {
  currentSpaceID: Observable<ComponentID> = new Observable();
  spaceScore: Observable<number> = new Observable();
  spaceRequiredScore: Observable<number> = new Observable();
  spaceMaxScore: Observable<number> = new Observable();
}
