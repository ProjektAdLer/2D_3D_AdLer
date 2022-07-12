import Observable from "../../../../../Lib/Observable";
import { LearningElementTO } from "../../../Ports/LearningWorldPort/ILearningWorldPort";

export default class LearningElementsDropdownViewModel {
  learningElementNames = new Observable<string[]>([], true);
  learningElements = new Observable<LearningElementTO[]>([], true);
}
