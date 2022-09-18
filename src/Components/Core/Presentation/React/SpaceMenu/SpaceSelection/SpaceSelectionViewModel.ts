import { ElementID } from "src/Components/Core/Domain/Types/EntityTypes";
import Observable from "src/Lib/Observable";

export default class SpaceSelectionViewModel {
  // TODO: replace default values when they are set from actual data
  public spaceTitles: Observable<string[]> = new Observable<string[]>([
    "Lernraum 1",
    "Lernraum 2",
    "Lernraum 3",
  ]);
  public spaceIDs: Observable<ElementID[]> = new Observable<ElementID[]>([
    1, 2, 3,
  ]);
}
