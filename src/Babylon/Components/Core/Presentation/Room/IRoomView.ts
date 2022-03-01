import { Scene } from "@babylonjs/core";
export default interface IRoomView {
  createFloor(scene: Scene): void;
  createWalls(scene: Scene): void;
  createPositions(): number[];
  createFloorIndices(): number[];
  createWallIndices(): number[];
}
