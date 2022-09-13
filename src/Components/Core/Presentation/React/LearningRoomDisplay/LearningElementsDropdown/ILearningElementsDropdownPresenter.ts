import LearningElementTO from "src/Components/Core/Application/DataTransportObjects/LearningElementTO";

export default interface ILearningElementsDropdownPresenter {
  presentLearningElements(learningElements: LearningElementTO[]): void;
}
