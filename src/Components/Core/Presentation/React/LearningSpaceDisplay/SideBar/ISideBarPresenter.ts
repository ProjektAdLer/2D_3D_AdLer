import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

export default interface ISideBarPresenter extends ILearningWorldAdapter {
  onStoryElementCutSceneTriggered(storyType: StoryElementType): void;
  onStoryElementCutSceneFinished(): void;
}
