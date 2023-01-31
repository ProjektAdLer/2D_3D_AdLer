import { ElementID } from "src/Components/Core/Domain/Types/EntityTypes";
import Observable from "src/Lib/Observable";
import { ElementTypeStrings } from "../../../../Domain/Types/ElementTypes";

export default class SpaceDetailViewModel {
  // world data
  // spaces (id, name, isCompleted)
  spaces: Observable<[number, string, boolean][]> = new Observable<
    [number, string, boolean][]
  >([[1, "Placeholder", false]]);

  // space data
  id: Observable<ElementID> = new Observable<ElementID>(undefined);
  name: Observable<string> = new Observable<string>("");
  description: Observable<string> = new Observable<string>("");
  goals: Observable<string> = new Observable<string>("");
  requiredPoints: Observable<number> = new Observable<number>(0);
  requirements: Observable<number[]> = new Observable<number[]>([1]);

  // element data (type, name, hasScored, points)
  elements: Observable<[ElementTypeStrings, string, boolean, number][]> =
    new Observable<[ElementTypeStrings, string, boolean, number][]>([]);
}
