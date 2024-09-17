import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import AvatarViewModel from "./AvatarViewModel";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import { Vector3 } from "@babylonjs/core";

export default interface IAvatarPresenter extends ILearningWorldAdapter {
  set ViewModel(newViewModel: AvatarViewModel);
  get AvatarPosition(): Vector3;

  onStoryElementCutSceneTriggered(storyType: StoryElementType): void;
  onStoryElementCutSceneFinished(): void;
}
