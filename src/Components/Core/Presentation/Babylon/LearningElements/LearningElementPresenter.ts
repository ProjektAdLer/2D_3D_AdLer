import { Vector3 } from "@babylonjs/core/Maths/math";
import ILearningElementPresenter from "./ILearningElementPresenter";
import LearningElementViewModel from "./LearningElementViewModel";
import IBottomTooltipPresenter from "~ReactComponents/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";

export default class LearningElementPresenter
  implements ILearningElementPresenter
{
  constructor(private viewModel: LearningElementViewModel) {}

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

  onAvatarPositionChanged(position: Vector3, interactionRadius: number): void {
    const distance = Vector3.Distance(position, this.viewModel.position);

    if (distance <= interactionRadius)
      this.viewModel.isInteractable.Value = true;
    else if (this.viewModel.isInteractable.Value)
      this.viewModel.isInteractable.Value = false;
  }
}
