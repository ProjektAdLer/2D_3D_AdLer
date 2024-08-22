import { AnimationGroup, TransformNode, Vector3 } from "@babylonjs/core";
import CharacterAnimationActions from "./CharacterAnimationActions";
import CharacterAnimationStates from "./CharacterAnimationStates";

export default interface ICharacterAnimator {
  setup(
    getCharacterVelocity: () => Vector3,
    characterRotationNode: TransformNode,
    idleAnimation: AnimationGroup,
    walkAnimation: AnimationGroup,
    interactionAnimation?: AnimationGroup
  ): void;
  transition(action: CharacterAnimationActions): boolean;
  readonly CurrentAnimationState: CharacterAnimationStates;
}
