import { Scene } from "@babylonjs/core";
export default interface IRoomView {
  createFloor(scene: Scene): void;
  createWalls(scene: Scene): void;
  createRoomVertices(scene: Scene): void;
}
