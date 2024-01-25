import { Vector3 } from "@babylonjs/core";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface IDoorPresenter extends ILearningWorldAdapter {
  onAvatarPositionChanged(position: Vector3, interactionRadius: number): void;
  onStoryElementCutSceneTriggered(enableInput: boolean): void;
  onStoryElementCutSceneFinished(): void;
}
