import { Vector3 } from "@babylonjs/core";
import { IReadyable } from "src/Lib/Readyable";

export default interface ICharacterNavigator extends IReadyable {
  get CharacterVelocity(): Vector3;
  startMovement(target: Vector3, onTargetReached?: () => void): void;
  stopMovement(): void;
}
