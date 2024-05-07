import { ComponentID } from "../../../../Domain/Types/EntityTypes";

export default interface ILearningElementsDropdownController {
  startLearningElement(elementID: ComponentID): void;
}
