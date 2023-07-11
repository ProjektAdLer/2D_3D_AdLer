import { Vector3 } from "@babylonjs/core";

export default interface IMovementIndicator {
  display(position: Vector3, loopUntilHidden?: boolean): void;
  hide(): void;
}
