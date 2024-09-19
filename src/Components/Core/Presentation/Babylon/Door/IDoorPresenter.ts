import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import IAvatarFocusable from "../Avatar/AvatarFocusSelection/IAvatarFocusable";

export default interface IDoorPresenter
  extends ILearningWorldAdapter,
    IAvatarFocusable {
  onStoryElementCutSceneTriggered(storyType: StoryElementType): void;
  onStoryElementCutSceneFinished(): void;
}
