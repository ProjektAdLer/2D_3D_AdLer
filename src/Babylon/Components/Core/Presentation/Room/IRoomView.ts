import { Scene } from "@babylonjs/core";
export default interface IRoomView {
  createFloor(scene: Scene): void;
  createWalls(scene: Scene): void;
  createFloorPositions(): number[];
  createRoomPositions(): number[];
  createFloorIndices(): number[];
  createWallIndices(): number[];
}
