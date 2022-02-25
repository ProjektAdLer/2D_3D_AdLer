import { Scene } from "@babylonjs/core";
import { ROOMSIZE } from "../../BusinessLogic/RoomConfigurator/RoomConfigurator";

export default interface IRoomView {
  setRoomScale(roomSize: ROOMSIZE): number;
  createFloor(scene: Scene, roomScale: number): void;
  createWalls(scene: Scene, roomScale: number): void;
}
