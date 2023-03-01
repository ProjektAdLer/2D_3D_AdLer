import Observable from "../../../../../../Lib/Observable";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default class SpaceCompletionModalViewModel {
  currentSpaceID = new Observable<ComponentID>();
  wasClosedOnce: boolean = false;
  showModal = new Observable<boolean>(false);
  score = new Observable<number>();
  maxScore = new Observable<number>(100);
  requiredScore = new Observable<number>();
}
