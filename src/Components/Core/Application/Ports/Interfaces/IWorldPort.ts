import ElementTO from "../../DataTransferObjects/ElementTO";
import SpaceScoreTO from "../../DataTransferObjects/SpaceScoreTO";
import SpaceTO from "../../DataTransferObjects/SpaceTO";
import UserWorldsTO from "../../DataTransferObjects/UserWorldsTO";
import WorldTO from "../../DataTransferObjects/WorldTO";
import WorldScoreTO from "../../DataTransferObjects/WorldScoreTO";
import { ComponentID } from "../../../Domain/Types/EntityTypes";
import { IAbstractPort } from "./IAbstractPort";
import IWorldAdapter from "../../../Ports/WorldPort/IWorldAdapter";

export default interface IWorldPort extends IAbstractPort<IWorldAdapter> {
  //userWorlds
  onUserWorldsLoaded(userWorldsTO: UserWorldsTO): void;
  // world
  onWorldLoaded(worldTO: WorldTO): void;

  onWorldScored(worldScoreTO: WorldScoreTO): void;

  // space
  onSpaceLoaded(spaceTO: SpaceTO): void;
  onSpaceScored(spaceScoreTO: SpaceScoreTO): void;

  // element
  onElementLoaded(elementStartedTO: ElementTO): void;
  onElementScored(hasScored: boolean, elementID: ComponentID): void;
}
