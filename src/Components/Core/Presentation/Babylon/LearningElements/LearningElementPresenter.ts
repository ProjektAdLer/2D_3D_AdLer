import { Vector3 } from "@babylonjs/core/Maths/math";
import ILearningElementPresenter from "./ILearningElementPresenter";
import LearningElementViewModel from "./LearningElementViewModel";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import bind from "bind-decorator";
import { FocusableTypes } from "../Avatar/AvatarFocusSelection/IAvatarFocusable";

export default class LearningElementPresenter
  implements ILearningElementPresenter
{
  private centerPosition: Vector3;
  private isInteractableBeforeCutscene: boolean;

  constructor(private viewModel: LearningElementViewModel) {}

  getFocusableCenterPosition(): Vector3 {
    if (!this.centerPosition) {
      const { min, max } =
        this.viewModel.modelMeshes[0].getHierarchyBoundingVectors();
      this.centerPosition = min
        .add(max)
        .scale(0.5)
        .multiplyInPlace(new Vector3(1, 0, 1));
    }

    return this.centerPosition;
  }

  getID(): { id: number; type: FocusableTypes } {
    return {
      id: this.viewModel.id,
      type: FocusableTypes.learningElement,
    };
  }

  onLearningElementScored(hasScored: boolean, elementID: number): void {
    if (this.viewModel.id === elementID) {
      this.viewModel.hasScored.Value = hasScored;
    }
  }

  onLearningElementHighlighted(learningElementID: number): void {
    if (this.viewModel.id === learningElementID) {
      this.viewModel.isHighlighted.Value = true;

      setTimeout(() => {
        this.viewModel.isHighlighted.Value = false;
      }, this.viewModel.highlightTimeout);
    }
  }

  onStoryElementCutSceneTriggered(storyType: StoryElementType): void {
    this.isInteractableBeforeCutscene = this.viewModel.isInteractable.Value;
    if (this.isInteractableBeforeCutscene) {
      this.onUnfocused();
    }
  }

  onStoryElementCutSceneFinished(): void {
    if (this.isInteractableBeforeCutscene) {
      this.onFocused();
    }
  }

  @bind
  onFocused(): void {
    this.viewModel.isInteractable.Value = true;
  }

  @bind
  isSpecialFocused(): boolean {
    return this.viewModel.isSpecialFocused;
  }

  @bind
  onSpecialFocused(): void {
    this.viewModel.isSpecialFocused = true;
  }

  @bind
  onSpecialUnfocused(): void {
    this.viewModel.isSpecialFocused = false;
  }

  @bind
  onUnfocused(): void {
    this.viewModel.isInteractable.Value = false;
  }
}
