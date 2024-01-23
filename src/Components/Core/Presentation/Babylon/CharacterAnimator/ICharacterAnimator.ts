import { AnimationGroup, Vector3 } from "@babylonjs/core";
import CharacterAnimationActions from "./CharacterAnimationActions";

export default interface ICharacterAnimator {
  setup(
    getCharacterVelocity: () => Vector3,
    idleAnimation: AnimationGroup,
    walkAnimation: AnimationGroup,
    interactionAnimation?: AnimationGroup
  ): void;
  transition(action: CharacterAnimationActions): void;
}
