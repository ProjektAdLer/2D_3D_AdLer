import { LearningElementTO } from "../../Application/LoadWorld/ILearningWorldPort";
import ILearningElementPresenter from "./ILearningElementPresenter";
import LearningElementViewModel from "./LearningElementViewModel";

export default class LearningElementPresenter
  implements ILearningElementPresenter
{
  private viewModel: LearningElementViewModel;

  public set ViewModel(newViewModel: LearningElementViewModel) {
    this.viewModel = newViewModel;
  }

  public presentLearningElement(learningElementTO: LearningElementTO): void {}
}
