import { Vector3 } from "@babylonjs/core/Maths/math";
import ILearningElementPresenter from "./ILearningElementPresenter";
import LearningElementViewModel from "./LearningElementViewModel";

export default class LearningElementPresenter
  implements ILearningElementPresenter
{
  constructor(private viewModel: LearningElementViewModel) {}

  get Position(): Vector3 {
    const { min, max } =
      this.viewModel.modelMeshes[0].getHierarchyBoundingVectors();
    return min
      .add(max)
      .scale(0.5)
      .multiplyInPlace(new Vector3(1, 0, 1));
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

  onFocused(): void {
    this.viewModel.isInteractable.Value = true;
  }

  onUnfocused(): void {
    this.viewModel.isInteractable.Value = false;
  }
}
