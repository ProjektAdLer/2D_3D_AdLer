import LearningWorldTO from "../../Application/DataTransportObjects/LearningWorldTO";

/**
 * This interface is used to register with the LearningWorldPort and defines all the methods that can be called by the LearningWorldPort.
 */
export default interface ILearningWorldAdapter {
  onLearningWorldLoaded(learningWorld: LearningWorldTO): void;
}
