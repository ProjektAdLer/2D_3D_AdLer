import { LearningElementTO } from "./../LoadWorld/ILearningWorldPort";
export default interface ILearningElementPort {
  presentLearningElementStarted(
    learningElementStartedTO: LearningElementTO
  ): void;
}
