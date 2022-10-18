import WorldTO from "../../Application/DataTransferObjects/WorldTO";

export default interface IWorldPort {
  presentWorld(worldTO: WorldTO): void;
}
