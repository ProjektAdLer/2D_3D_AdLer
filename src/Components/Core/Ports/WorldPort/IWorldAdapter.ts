import ElementTO from "../../Application/DataTransferObjects/ElementTO";
import SpaceScoreTO from "../../Application/DataTransferObjects/SpaceScoreTO";
import SpaceTO from "../../Application/DataTransferObjects/SpaceTO";
import WorldTO from "../../Application/DataTransferObjects/WorldTO";
import UserWorldsTO from "../../Application/DataTransferObjects/UserWorldsTO";
import { ComponentID } from "../../Domain/Types/EntityTypes";

/**
 * This interface is used to register with the LearningWorldPort and defines all the methods that can be called by the LearningWorldPort.
 */
export default interface IWorldAdapter {
  // userWorlds
  onUserWorldsLoaded?(userWorldsTO: UserWorldsTO): void;

  // world
  onWorldLoaded?(world: WorldTO): void;

  // space
  onSpaceLoaded?(spaceTO: SpaceTO): void;
  onSpaceScored?(spaceScoreTO: SpaceScoreTO): void;

  // element
  onElementLoaded?(elementTO: ElementTO): void;
  onElementScored?(hasScored: boolean, elementID: ComponentID): void;
}
