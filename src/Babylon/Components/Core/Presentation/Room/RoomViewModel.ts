import { injectable } from "inversify";
import { ROOMSIZE } from "../../BusinessLogic/RoomConfigurator/RoomConfigurator";

@injectable()
export default class RoomViewModel {
  private roomSize: ROOMSIZE;

  get RoomSize(): ROOMSIZE {
    if (!this.roomSize) throw new Error("roomSize not found!");
    return this.roomSize;
  }

  set RoomSize(newRoomSize: ROOMSIZE) {
    this.roomSize = newRoomSize;
  }
}
