import Observable from "src/Lib/Observable";
import { ElementTypeStrings } from "../../../Babylon/Elements/Types/ElementTypes";

export default class DetailSectionViewModel {
  name: Observable<string> = new Observable<string>("");
  description: Observable<string> = new Observable<string>("");
  requirements: Observable<[boolean, string][]> = new Observable<
    [boolean, string][]
  >([]);
  conditions: Observable<[boolean, string][]> = new Observable<
    [boolean, string][]
  >([]);
  elements: Observable<[ElementTypeStrings, string][]> = new Observable<
    [ElementTypeStrings, string][]
  >([]);
}
