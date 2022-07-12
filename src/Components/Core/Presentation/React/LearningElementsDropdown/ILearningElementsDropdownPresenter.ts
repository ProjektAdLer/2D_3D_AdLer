import { LearningElementTO } from "../../../Ports/LearningWorldPort/ILearningWorldPort";
export default interface ILearningElementsDropdownPresenter {
  presentLearningElements(learningElements: LearningElementTO[]): void;
}
