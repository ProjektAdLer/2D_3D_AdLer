import ElementTO from "../../Application/DataTransferObjects/ElementTO";
import SpaceScoreTO from "../../Application/DataTransferObjects/SpaceScoreTO";
import SpaceTO from "../../Application/DataTransferObjects/SpaceTO";
import WorldTO from "../../Application/DataTransferObjects/WorldTO";
import { ElementID } from "../../Domain/Types/EntityTypes";
import { IAbstractPort } from "../AbstractPort/IAbstractPort";
import IWorldAdapter from "./IWorldAdapter";

export default interface IWorldPort extends IAbstractPort<IWorldAdapter> {
  // world
  onWorldLoaded(worldTO: WorldTO): void;

  // space
  onSpaceLoaded(spaceTO: SpaceTO): void;
  onSpaceScored(spaceScoreTO: SpaceScoreTO): void;

  // element
  onElementLoaded(elementStartedTO: ElementTO): void;
  onElementScored(hasScored: boolean, elementID: ElementID): void;
}
