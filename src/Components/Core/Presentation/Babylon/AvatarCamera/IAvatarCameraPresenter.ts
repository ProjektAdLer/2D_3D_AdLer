import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

export default interface IAvatarCameraPresenter extends ILearningWorldAdapter {
  onStoryElementCutSceneTriggered(storyType: StoryElementType): void;
  onStoryElementCutSceneFinished(): void;
}
