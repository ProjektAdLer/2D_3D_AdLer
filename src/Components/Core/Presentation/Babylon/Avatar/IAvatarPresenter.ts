import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import AvatarViewModel from "./AvatarViewModel";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

export default interface IAvatarPresenter extends ILearningWorldAdapter {
  set ViewModel(newViewModel: AvatarViewModel);

  onStoryElementCutSceneTriggered(storyType: StoryElementType): void;
  onStoryElementCutSceneFinished(): void;
}
