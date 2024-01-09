import CharacterAnimationActions from "./CharacterAnimationActions";

export default interface ICharacterAnimator {
  transition(action: CharacterAnimationActions): void;
}
