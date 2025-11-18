import { ComponentID } from "../../../../Domain/Types/EntityTypes";
import Observable from "../../../../../../Lib/Observable";

export default class LearningElementModalViewModel {
  id: Observable<number> = new Observable<ComponentID>();
  isOpen: Observable<boolean> = new Observable<boolean>(false);
  name: Observable<string> = new Observable<string>();
  type = new Observable<string>();
  filePath = new Observable<string>();
  isScoreable = new Observable<boolean>();
  isVisible = new Observable<boolean>(true);

  hasScored = new Observable<boolean>();

  cookieConsent = new Observable<"accepted" | "declined" | null>(null);

  readonly openDelay: number = 1600;

  parentSpaceID = new Observable<ComponentID>();
  parentWorldID = new Observable<ComponentID>();
}
