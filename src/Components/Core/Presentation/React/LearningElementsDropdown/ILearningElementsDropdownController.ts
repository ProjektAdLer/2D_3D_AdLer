import { LearningComponentID } from "../../../Types/EnitityTypes";

export default interface ILearningElementsDropdownController {
  startLearningElement(learningElementId: LearningComponentID): void;
}
