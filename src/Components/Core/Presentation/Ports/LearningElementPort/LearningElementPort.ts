import ILearningElementPort from "../../../Application/LearningElementStarted/ILearningElementStartedPort";
import { LearningElementTO } from "../../../Application/LoadWorld/ILearningWorldPort";

export default class LearningElementPort implements ILearningElementPort {
  presentLearningElementStarted(
    learningElementStartedTO: LearningElementTO
  ): void {
    throw new Error("Method not implemented.");
  }
}
