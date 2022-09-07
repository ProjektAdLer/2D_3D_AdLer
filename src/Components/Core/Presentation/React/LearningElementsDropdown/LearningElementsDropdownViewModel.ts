import LearningElementTO from "src/Components/Core/Application/DataTransportObjects/LearningElementTO";
import Observable from "../../../../../Lib/Observable";

export default class LearningElementsDropdownViewModel {
  learningElementNames = new Observable<string[]>([], true);
  learningElements = new Observable<LearningElementTO[]>([], true);
}
