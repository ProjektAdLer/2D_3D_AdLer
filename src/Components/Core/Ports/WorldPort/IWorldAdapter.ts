import ElementTO from "../../Application/DataTransferObjects/ElementTO";
import SpaceScoreTO from "../../Application/DataTransferObjects/SpaceScoreTO";
import SpaceTO from "../../Application/DataTransferObjects/SpaceTO";
import WorldTO from "../../Application/DataTransferObjects/WorldTO";
import WorldScoreTO from "../../Application/DataTransferObjects/WorldScoreTO";
import UserWorldsTO from "../../Application/DataTransferObjects/UserWorldsTO";
import { ComponentID } from "../../Domain/Types/EntityTypes";

/**
 * This interface is used to register with the WorldPort and defines all the methods that can be called by the WorldPort.
 */
export default interface IWorldAdapter {
  // userWorlds
  onUserWorldsLoaded?(userWorldsTO: UserWorldsTO): void;

  // world
  onWorldLoaded?(world: WorldTO): void;
  onWorldScored?(worldScoreTO: WorldScoreTO): void;

  // space
  onSpaceLoaded?(spaceTO: SpaceTO): void;
  onSpaceScored?(spaceScoreTO: SpaceScoreTO): void;

  // element
  onElementLoaded?(elementTO: ElementTO): void;
  onElementScored?(hasScored: boolean, elementID: ComponentID): void;
}
