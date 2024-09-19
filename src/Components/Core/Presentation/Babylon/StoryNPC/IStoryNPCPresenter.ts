import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import IAvatarFocusable from "../Avatar/AvatarFocusSelection/IAvatarFocusable";

export default interface IStoryNPCPresenter
  extends ILearningWorldAdapter,
    IAvatarFocusable {
  changeStateFromStopToRandomMovement(): void;
}
