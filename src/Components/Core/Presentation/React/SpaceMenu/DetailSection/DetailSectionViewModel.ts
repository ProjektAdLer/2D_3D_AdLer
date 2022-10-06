import { ElementID } from "src/Components/Core/Domain/Types/EntityTypes";
import Observable from "src/Lib/Observable";
import { ElementTypeStrings } from "../../../Babylon/Elements/Types/ElementTypes";

export default class DetailSectionViewModel {
  id: Observable<ElementID> = new Observable<ElementID>();
  name: Observable<string> = new Observable<string>("Placeholder Name");
  description: Observable<string> = new Observable<string>(
    "Placeholder Description"
  );
  goals: Observable<string> = new Observable<string>("Placeholder Goals");

  elements: Observable<[ElementTypeStrings, string][]> = new Observable<
    [ElementTypeStrings, string][]
  >([]);
  requiredPoints: Observable<number> = new Observable<number>(0);
  // includedPoints: Observable<number> = new Observable<number>(0);
  requirements: Observable<[boolean, string][]> = new Observable<
    [boolean, string][]
  >([]);
}
// DSL CONTENT:
// name(identifier, value) string
// description string
// goals string
// content ElementTO array
// requiredPoints number
// includedPoints number
// requirements [bool, ElementTO] Array (done or not done, name)
