import { Vector3 } from "@babylonjs/core";

export default interface IDoorPresenter {
  presentDoor(position: [Vector3, number]): void;
}
