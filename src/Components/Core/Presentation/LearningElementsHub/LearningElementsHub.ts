import ILearningElementPort from "../../Application/LearningElementStarted/ILearningElementStartedPort";
import { LearningElementTO } from "../../Application/LoadWorld/ILearningWorldPort";

export default class LearningElementsHub implements ILearningElementPort {
  presentLearningElementStarted(
    learningElementStartedTO: LearningElementTO
  ): void {
    throw new Error("Method not implemented.");
  }
}
