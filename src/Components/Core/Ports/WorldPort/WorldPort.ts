import { injectable } from "inversify";
import IWorldPort from "./IWorldPort";
import WorldTO from "../../Application/DataTransferObjects/WorldTO";
import AbstractPort from "../AbstractPort/AbstractPort";
import IWorldAdapter from "./IWorldAdapter";

@injectable()
export default class WorldPort
  extends AbstractPort<IWorldAdapter>
  implements IWorldPort
{
  public presentWorld(worldTO: WorldTO): void {
    this.adapters.forEach((adapter) => adapter.onWorldLoaded(worldTO));
  }
}
