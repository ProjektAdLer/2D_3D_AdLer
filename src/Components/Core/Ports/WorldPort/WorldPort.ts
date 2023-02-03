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
    this.adapters.forEach((adapter) => {
      if (adapter.onWorldLoaded) adapter.onWorldLoaded(worldTO);
    });
  }

  // space
  onSpaceLoaded(spaceTO: SpaceTO): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onSpaceLoaded) adapter.onSpaceLoaded(spaceTO);
    });
  }
  onSpaceScored(spaceScoreTO: SpaceScoreTO): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onSpaceScored) adapter.onSpaceScored(spaceScoreTO);
    });
  }

  // element
  onElementLoaded(elementStartedTO: ElementTO): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onElementLoaded) adapter.onElementLoaded(elementStartedTO);
    });
  }
  onElementScored(hasScored: boolean, elementID: number): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onElementScored)
        adapter.onElementScored(hasScored, elementID);
    });
  }
}
