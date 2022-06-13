import { LearningElementTO } from "./../../../Application/LoadWorld/ILearningWorldPort";
export default interface ILearningElementsDropdownPresenter {
  presentLearningElements(learningElements: LearningElementTO[]): void;
}
