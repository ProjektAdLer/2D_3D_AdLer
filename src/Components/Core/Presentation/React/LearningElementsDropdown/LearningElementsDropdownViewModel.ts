import Observable from "../../../../../Lib/Observable";

export default class LearningElementsDropdownViewModel {
  learningElementNames = new Observable<string[]>([], true);
}
