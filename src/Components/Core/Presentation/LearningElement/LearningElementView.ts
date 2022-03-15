import { injectable } from "inversify";
import ILearningElementView from "./ILearningElementView";
import LearningElementViewModel from "./LearningElementViewModel";

@injectable()
export default class LearningElementView implements ILearningElementView {
  private viewModel: LearningElementViewModel;

  set ViewModel(newViewModel: LearningElementViewModel) {
    this.viewModel = newViewModel;
  }
}
