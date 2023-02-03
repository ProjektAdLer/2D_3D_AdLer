import SpaceScoreTO from "../../Application/DataTransferObjects/SpaceScoreTO";
import SpaceTO from "../../Application/DataTransferObjects/SpaceTO";
import WorldTO from "../../Application/DataTransferObjects/WorldTO";

/**
 * This interface is used to register with the LearningWorldPort and defines all the methods that can be called by the LearningWorldPort.
 */
export default interface IWorldAdapter {
  // world
  onWorldLoaded?(world: WorldTO): void;

  // space
  onSpaceLoaded?(spaceTO: SpaceTO): void;
  onSpaceScored?(spaceScoreTO: SpaceScoreTO): void;
}
