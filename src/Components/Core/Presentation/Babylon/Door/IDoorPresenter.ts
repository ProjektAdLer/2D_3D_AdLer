import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import IAvatarFocusable from "../Avatar/AvatarFocusSelection/IAvatarFocusable";
import { Vector3 } from "@babylonjs/core";

export default interface IDoorPresenter
  extends ILearningWorldAdapter,
    IAvatarFocusable {
  onStoryElementCutSceneTriggered(storyType: StoryElementType): void;
  onStoryElementCutSceneFinished(storyType: StoryElementType): void;
  isExit(): boolean;
  getEnterablePosition(): Vector3;
  open(onAnimationEnd?: () => void): void;
  close(): void;
}
