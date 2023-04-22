import { Vector3 } from "@babylonjs/core";

export default interface IWindowPresenter {
  presentWindow(position: [Vector3, number]): void;
}
