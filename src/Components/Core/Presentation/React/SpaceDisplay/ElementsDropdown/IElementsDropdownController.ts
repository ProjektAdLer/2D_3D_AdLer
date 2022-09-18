import { ElementID } from "../../../../Domain/Types/EntityTypes";

export default interface IElementsDropdownController {
  startElement(elementId: ElementID): void;
}
