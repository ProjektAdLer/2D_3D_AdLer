import { ComponentID } from "../../../../Domain/Types/EntityTypes";

export default interface IElementsDropdownController {
  startElement(elementID: ComponentID): void;
}
