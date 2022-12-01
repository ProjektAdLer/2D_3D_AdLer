import WorldTO from "../../Application/DataTransferObjects/WorldTO";
import { IAbstractPort } from "../AbstractPort/IAbstractPort";
import IWorldAdapter from "./IWorldAdapter";

export default interface IWorldPort extends IAbstractPort<IWorldAdapter> {
  onWorldLoaded(worldTO: WorldTO): void;
}
