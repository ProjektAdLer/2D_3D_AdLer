import { injectable } from "inversify";
import { ROOMSIZE } from "../../BusinessLogic/RoomConfigurator/RoomConfigurator";
import { Color3 } from "@babylonjs/core";

@injectable()
export default class RoomViewModel {
  private roomSize: ROOMSIZE;
  private wallColor: Color3 = new Color3(0.3, 0.6, 0.8);
  private roomWidth: number = 10;
  private roomLength: number = 10;
  private baseHeight: number = 0.5;
  private roomHeight: number = 2.5;
  private doorWidth: number = 1.5;
  private doorHeight: number = 2.28;
  private wallThickness: number = 1;

  get RoomSize(): ROOMSIZE {
    if (!this.roomSize) throw new Error("roomSize not found!");
    return this.roomSize;
  }

  set RoomSize(newRoomSize: ROOMSIZE) {
    this.roomSize = newRoomSize;
  }
  get WallColor(): Color3 {
    if (!this.wallColor) throw new Error("wallColor not found!");
    return this.wallColor;
  }
  set WallColor(newWallColor: Color3) {
    this.wallColor = newWallColor;
  }

  //Room Attributes Setter + Getter
  get RoomWidth(): number {
    if (!this.roomWidth) throw new Error("roomWidth not found or set to 0!");
    return this.roomWidth;
  }
  set RoomWidth(newRoomWidth: number) {
    this.roomWidth = newRoomWidth;
  }
  get RoomLength(): number {
    if (!this.roomLength) throw new Error("roomLength not found or set to 0!");
    return this.roomLength;
  }
  set RoomLength(newRoomLength: number) {
    this.roomLength = newRoomLength;
  }
  get BaseHeight(): number {
    if (this.baseHeight === undefined || null)
      throw new Error("baseHeight not found!");
    return this.baseHeight;
  }
  set BaseHeight(newBaseHeight: number) {
    this.baseHeight = newBaseHeight;
  }
  get RoomHeight(): number {
    if (!this.roomHeight) throw new Error("roomHeight not found or set to 0!");
    return this.roomHeight;
  }
  set RoomHeight(newRoomHeight: number) {
    this.roomHeight = newRoomHeight;
  }
  get DoorWidth(): number {
    if (!this.doorWidth) throw new Error("doorWidth not found or set to 0!");
    return this.doorWidth;
  }
  set DoorWidth(newDoorWidth: number) {
    this.doorWidth = newDoorWidth;
  }
  get DoorHeight(): number {
    if (!this.doorHeight) throw new Error("doorHeight not found or set to 0!");
    return this.doorHeight;
  }
  set DoorHeight(newDoorHeight: number) {
    this.doorHeight = newDoorHeight;
  }
  get WallThickness(): number {
    if (this.wallThickness === undefined || null)
      throw new Error("wallThickness not found!");
    return this.wallThickness;
  }
  set WallThickness(newWallThickness: number) {
    this.wallThickness = newWallThickness;
  }
}
