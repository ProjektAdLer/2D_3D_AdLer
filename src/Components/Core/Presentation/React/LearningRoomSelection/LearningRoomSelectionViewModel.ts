import { LearningComponentID } from "src/Components/Core/Types/EnitityTypes";
import Observable from "src/Lib/Observable";

export default class LearningRoomSelectionViewModel {
  // TODO: replace default values when they are set from actual data
  public learningRoomTitles: Observable<string[]> = new Observable<string[]>([
    "Lernraum 1",
    "Lernraum 2",
    "Lernraum 3",
  ]);
  public learningRoomIDs: Observable<LearningComponentID[]> = new Observable<
    LearningComponentID[]
  >([1, 2, 3]);
}
