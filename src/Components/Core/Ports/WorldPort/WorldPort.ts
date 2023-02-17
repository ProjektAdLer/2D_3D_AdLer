import { injectable } from "inversify";
import IWorldPort from "./IWorldPort";
import WorldTO from "../../Application/DataTransferObjects/WorldTO";
import AbstractPort from "../AbstractPort/AbstractPort";
import IWorldAdapter from "./IWorldAdapter";
import ElementTO from "../../Application/DataTransferObjects/ElementTO";
import SpaceScoreTO from "../../Application/DataTransferObjects/SpaceScoreTO";
import SpaceTO from "../../Application/DataTransferObjects/SpaceTO";
import UserWorldsTO from "../../Application/DataTransferObjects/UserWorldsTO";
import { ComponentID } from "../../Domain/Types/EntityTypes";

@injectable()
export default class WorldPort
  extends AbstractPort<IWorldAdapter>
  implements IWorldPort
{
  // userWorlds
  public onUserWorldsLoaded(userWorldsTO: UserWorldsTO): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onUserWorldsLoaded) adapter.onUserWorldsLoaded(userWorldsTO);
    });
  }
  // world
  public onWorldLoaded(worldTO: WorldTO): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onWorldLoaded) adapter.onWorldLoaded(worldTO);
    });
  }

  // space
  public onSpaceLoaded(spaceTO: SpaceTO): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onSpaceLoaded) adapter.onSpaceLoaded(spaceTO);
    });
  }
  public onSpaceScored(spaceScoreTO: SpaceScoreTO): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onSpaceScored) adapter.onSpaceScored(spaceScoreTO);
    });
  }

  // element
  public onElementLoaded(elementStartedTO: ElementTO): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onElementLoaded) adapter.onElementLoaded(elementStartedTO);
    });
  }
  public onElementScored(hasScored: boolean, elementID: ComponentID): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onElementScored)
        adapter.onElementScored(hasScored, elementID);
    });
  }
}
