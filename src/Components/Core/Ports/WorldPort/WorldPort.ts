import { injectable } from "inversify";
import IWorldPort from "./IWorldPort";
import WorldTO from "../../Application/DataTransferObjects/WorldTO";
import AbstractPort from "../AbstractPort/AbstractPort";
import IWorldAdapter from "./IWorldAdapter";
import ElementTO from "../../Application/DataTransferObjects/ElementTO";
import SpaceScoreTO from "../../Application/DataTransferObjects/SpaceScoreTO";
import SpaceTO from "../../Application/DataTransferObjects/SpaceTO";

@injectable()
export default class WorldPort
  extends AbstractPort<IWorldAdapter>
  implements IWorldPort
{
  // world
  public onWorldLoaded(worldTO: WorldTO): void {
    this.adapters.forEach((adapter) => adapter.onWorldLoaded(worldTO));
  }

  // space
  onSpaceLoaded(spaceTO: SpaceTO): void {
    throw new Error("Method not implemented.");
  }
  onSpaceScored(spaceScoreTO: SpaceScoreTO): void {
    throw new Error("Method not implemented.");
  }

  // element
  onElementLoaded(elementStartedTO: ElementTO): void {
    throw new Error("Method not implemented.");
  }
  onElementScored(hasScored: boolean, elementID: number): void {
    throw new Error("Method not implemented.");
  }
}
