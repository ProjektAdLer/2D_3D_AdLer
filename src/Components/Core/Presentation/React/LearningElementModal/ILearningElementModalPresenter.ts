import { LearningElementTO } from "../../../Ports/LearningWorldPort/ILearningWorldPort";

export default interface ILearningElementModalPresenter {
  presentLearningElementModal(learningElementTO: LearningElementTO): void;
}
