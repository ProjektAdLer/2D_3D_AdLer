import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import IAvatarFocusable from "../Avatar/AvatarFocusSelection/IAvatarFocusable";

export default interface IDoorPresenter
  extends ILearningWorldAdapter,
    IAvatarFocusable {
  onStoryElementCutSceneTriggered(storyType: StoryElementType): void;
  onStoryElementCutSceneFinished(storyType: StoryElementType): void;
  isExit(): boolean;
  belongsToSpace(spaceID: number): boolean;
  open(onAnimationEnd?: () => void): void;
  close(): void;
}
