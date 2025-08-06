import { TransformNode, Vector3 } from "@babylonjs/core";
import { IReadyable } from "src/Lib/Readyable";
import ICharacterAnimator from "../CharacterAnimator/ICharacterAnimator";

export default interface ICharacterNavigator extends IReadyable {
  get CharacterVelocity(): Vector3;
  setup(
    parentNode: TransformNode,
    characterAnimator: ICharacterAnimator,
    verbose?: boolean,
  ): void;
  startMovement(target: Vector3, onTargetReached?: () => void): void;
  stopMovement(): void;
  removeAgent(): void;
  hideAgent(): void;
  showAgent(): void;
}
