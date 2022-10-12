import { ElementID } from "src/Components/Core/Domain/Types/EntityTypes";
import Observable from "src/Lib/Observable";
import { ElementTypeStrings } from "../../../../Domain/Types/ElementTypes";

export default class DetailSectionViewModel {
  // world data
  spaces: Observable<[number, string][]> = new Observable<[number, string][]>(
    []
  );
  spaceCompleted: Observable<[number, boolean][]> = new Observable<
    [number, boolean][]
  >([]);

  // space data
  id: Observable<ElementID> = new Observable<ElementID>(undefined);
  name: Observable<string> = new Observable<string>("");
  description: Observable<string> = new Observable<string>("");
  goals: Observable<string> = new Observable<string>("");
  requiredPoints: Observable<number> = new Observable<number>(0);
  requirements: Observable<number[]> = new Observable<number[]>([]);

  // element data (type, name, hasScored, points)
  elements: Observable<[ElementTypeStrings, string, boolean, number][]> =
    new Observable<[ElementTypeStrings, string, boolean, number][]>([]);
}

// DSL CONTENT:
// name(identifier, value) string
// description string
// goals string
// content ElementTO array
// requiredPoints number
// includedPoints number
// requirements [bool, ElementTO] Array (done or not done, name)
