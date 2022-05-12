import { LearningElementTO } from "../../../Application/LoadWorld/ILearningWorldPort";

export default interface ILearningElementModalPresenter {
  presentLearningElementModal(learningElementTO: LearningElementTO): void;
}
