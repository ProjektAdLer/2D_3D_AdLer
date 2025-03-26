import { Vector3 } from "@babylonjs/core";
import DoorViewModel from "./DoorViewModel";
import IDoorPresenter from "./IDoorPresenter";
import LearningSpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";

export default class DoorPresenter implements IDoorPresenter {
  constructor(private viewModel: DoorViewModel) {
    if (!this.viewModel) {
      throw new Error("ViewModel was passed as undefined");
    }
  }

  getFocusableCenterPosition(): Vector3 {
    return this.viewModel.position;
  }

  onFocused(): void {
    this.viewModel.isInteractable.Value = true;
  }

  onUnfocused(): void {
    this.viewModel.isInteractable.Value = false;
  }

  onLearningSpaceScored(spaceScoreTO: LearningSpaceScoreTO): void {
    if (
      spaceScoreTO.spaceID === this.viewModel.spaceID &&
      this.viewModel.isExit &&
      spaceScoreTO.currentScore >= spaceScoreTO.requiredScore
    ) {
      this.viewModel.isOpen.Value = true;
    }
  }

  onStoryElementCutSceneTriggered(storyType: StoryElementType): void {
    this.viewModel.isInputEnabled.Value = false;
  }

  onStoryElementCutSceneFinished(): void {
    this.viewModel.isInputEnabled.Value = true;
  }
}
