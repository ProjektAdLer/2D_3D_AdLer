import WorldTO from "../../Application/DataTransferObjects/WorldTO";

/**
 * This interface is used to register with the LearningWorldPort and defines all the methods that can be called by the LearningWorldPort.
 */
export default interface IWorldAdapter {
  onWorldLoaded(world: WorldTO): void;
}
