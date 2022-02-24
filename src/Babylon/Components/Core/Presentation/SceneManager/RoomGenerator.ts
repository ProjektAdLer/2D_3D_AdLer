import { injectable, inject } from "inversify";
import IRoomGenerator from "./IRoomGenerator";
import RoomConfigurator from "../../BusinessLogic/API/RoomConfigurator";

@injectable()
export default class RoomGenerator implements IRoomGenerator {
  private roomSize: string;
  constructor(@inject(RoomConfigurator) roomConfigurator: RoomConfigurator) {
    this.roomSize = roomConfigurator.RoomSize;
  }

  createFloor(roomSize: string) {
    //todo set floor proportions + material
  }

  createWalls(roomSize: string) {
    //todo set wall proportions + material
  }
}
