import { Scene } from "@babylonjs/core";
import RoomViewModel from "./RoomViewModel";
export default interface IRoomView {
  createFloor(scene: Scene): void;
  createWalls(scene: Scene): void;
  set ViewModel(newViewModel: RoomViewModel);
}
