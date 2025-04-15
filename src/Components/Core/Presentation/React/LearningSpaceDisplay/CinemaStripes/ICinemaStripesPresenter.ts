import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

export default interface ICinemaStripesPresenter {
  onStoryElementCutSceneTriggered(storyType: StoryElementType): void;
  onStoryElementCutSceneFinished(): void;
}
