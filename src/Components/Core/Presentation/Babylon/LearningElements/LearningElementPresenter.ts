import ILearningElementPresenter from "./ILearningElementPresenter";
import LearningElementViewModel from "./LearningElementViewModel";

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
}
