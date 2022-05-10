import { LearningElementTO } from "./../LoadWorld/ILearningWorldPort";
export interface ILearningElementStartedPort {
  presentLearningElementStarted(
    learningElementStartedTO: LearningElementTO
  ): void;
}
