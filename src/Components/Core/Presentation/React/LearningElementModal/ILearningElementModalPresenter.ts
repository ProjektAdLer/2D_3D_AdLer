import LearningElementTO from "src/Components/Core/Application/DataTransportObjects/LearningElementTO";

export default interface ILearningElementModalPresenter {
  presentLearningElementModal(learningElementTO: LearningElementTO): void;
}
