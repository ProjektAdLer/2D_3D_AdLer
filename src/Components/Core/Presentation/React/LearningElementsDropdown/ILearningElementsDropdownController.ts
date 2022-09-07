import { LearningComponentID } from "../../../Domain/Types/EntityTypes";

export default interface ILearningElementsDropdownController {
  startLearningElement(learningElementId: LearningComponentID): void;
}
