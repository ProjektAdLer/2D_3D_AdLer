import { LearningComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import Observable from "src/Lib/Observable";

export default class RoomSelectionSectionViewModel {
  // TODO: replace default values when they are set from actual data
  public roomTitles: Observable<string[]> = new Observable<string[]>([
    "Lernraum 1",
    "Lernraum 2",
    "Lernraum 3",
  ]);
  public roomIDs: Observable<LearningComponentID[]> = new Observable<
    LearningComponentID[]
  >([1, 2, 3]);
}
