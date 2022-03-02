import { injectable } from "inversify";
import { ROOMSIZE } from "../../BusinessLogic/RoomConfigurator/RoomConfigurator";

@injectable()
export default class RoomViewModel {
  private roomSize: ROOMSIZE;
  private roomScale: number;
  private roomAttributes: object;

  constructor() {
    console.log("room view model");
    this.roomAttributes = {
      roomWidth: 10,
      roomLength: 20,
      baseHeight: 0,
      roomHeight: 2.5,
      doorWidth: 1.5,
      doorHeight: 2.28,
      wallThickness: 1,
    };
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

  get RoomAttributes(): object {
    if (!this.roomAttributes)
      throw new Error("roomAttributes Object not found!");
    return this.roomAttributes;
  }

  set RoomAttributes(newRoomAttributes: object) {
    this.roomAttributes = { ...this.roomAttributes, ...newRoomAttributes };
  }
}
