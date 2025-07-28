import { Vector3 } from "@babylonjs/core";
import DoorViewModel from "./DoorViewModel";
import IDoorPresenter from "./IDoorPresenter";
import LearningSpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import { FocusableTypes } from "../Avatar/AvatarFocusSelection/IAvatarFocusable";

export default class DoorPresenter implements IDoorPresenter {
  constructor(private viewModel: DoorViewModel) {
    if (!this.viewModel) {
      throw new Error("ViewModel was passed as undefined");
    }
  }

  getFocusableCenterPosition(): Vector3 {
    return this.viewModel.position;
  }
  getType(): { type: FocusableTypes } {
    if (this.viewModel.isExit === false) {
      return { type: FocusableTypes.entryDoor };
    } else return { type: FocusableTypes.exitDoor };
  }

  onFocused(): void {
    this.viewModel.isInteractable.Value = true;
  }
  isSpecialFocused(): boolean {
    return this.viewModel.isSpecialFocused;
  }
  onSpecialFocused(): void {
    this.viewModel.isSpecialFocused = true;
  }
  onSpecialUnfocused(): void {
    this.viewModel.isSpecialFocused = false;
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

  onStoryElementCutSceneFinished(storyType: StoryElementType): void {
    this.viewModel.isInputEnabled.Value = true;
  }

  isExit(): boolean {
    return this.viewModel.isExit;
  }

  open(onAnimationEnd?: () => void): void {
    this.viewModel.doorLogic.open(onAnimationEnd);
  }

  close(): void {
    if (this.viewModel.doorLogic.close) this.viewModel.doorLogic.close();
  }
}
