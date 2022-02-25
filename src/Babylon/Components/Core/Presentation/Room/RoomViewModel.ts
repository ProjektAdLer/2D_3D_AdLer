import { injectable } from "inversify";
import { ROOMSIZE } from "../../BusinessLogic/RoomConfigurator/RoomConfigurator";

@injectable()
export default class RoomViewModel {
  private roomSize: ROOMSIZE;
  private roomScale: number;

  constructor() {
    console.log("room view model");
  }

  get RoomSize(): ROOMSIZE {
    if (!this.roomSize) throw new Error("roomSize not found!");
    return this.roomSize;
  }

  set RoomSize(newRoomSize: ROOMSIZE) {
    this.roomSize = newRoomSize;
  }

  get RoomScale(): number {
    if (!this.roomScale) throw new Error("roomScale not found!");
    return this.roomScale;
  }

  set RoomScale(newRoomScale: number) {
    this.roomScale = newRoomScale;
  }
}
