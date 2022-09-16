import Observable from "src/Lib/Observable";
import { LearningElementTypeStrings } from "../../../Babylon/LearningElement/Types/LearningElementTypes";

export default class DetailSectionViewModel {
  name: Observable<string> = new Observable<string>("");
  description: Observable<string> = new Observable<string>("");
  requirements: Observable<[boolean, string][]> = new Observable<
    [boolean, string][]
  >([]);
  conditions: Observable<[boolean, string][]> = new Observable<
    [boolean, string][]
  >([]);
  learningElements: Observable<[LearningElementTypeStrings, string][]> =
    new Observable<[LearningElementTypeStrings, string][]>([]);
}
