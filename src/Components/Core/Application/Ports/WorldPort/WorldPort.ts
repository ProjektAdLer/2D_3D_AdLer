import { injectable } from "inversify";
import IWorldPort from "../Interfaces/IWorldPort";
import WorldTO from "../../DataTransferObjects/WorldTO";
import AbstractPort from "../AbstractPort/AbstractPort";
import IWorldAdapter from "./IWorldAdapter";
import ElementTO from "../../DataTransferObjects/ElementTO";
import SpaceScoreTO from "../../DataTransferObjects/SpaceScoreTO";
import SpaceTO from "../../DataTransferObjects/SpaceTO";
import UserWorldsTO from "../../DataTransferObjects/UserWorldsTO";
import { ComponentID } from "../../../Domain/Types/EntityTypes";
import WorldScoreTO from "../../DataTransferObjects/WorldScoreTO";

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

  public onWorldScored(worldScoreTO: WorldScoreTO): void {
    this.adapters.forEach((adapter) => {
      if (adapter.onWorldScored) adapter.onWorldScored(worldScoreTO);
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
