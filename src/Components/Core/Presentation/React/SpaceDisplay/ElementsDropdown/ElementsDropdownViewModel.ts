import ElementTO from "src/Components/Core/Application/DataTransferObjects/ElementTO";
import Observable from "../../../../../../Lib/Observable";

export default class ElementsDropdownViewModel {
  elementNames = new Observable<string[]>([], true);
  elements = new Observable<ElementTO[]>([], true);
}
