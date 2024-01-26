import { Vector3 } from "@babylonjs/core";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

export default interface IDoorPresenter extends ILearningWorldAdapter {
  onAvatarPositionChanged(position: Vector3, interactionRadius: number): void;
  onStoryElementCutSceneTriggered(storyType: StoryElementType): void;
  onStoryElementCutSceneFinished(): void;
}
