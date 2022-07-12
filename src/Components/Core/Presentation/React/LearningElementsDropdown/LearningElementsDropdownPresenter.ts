import { LearningElementTO } from "../../../Ports/LearningWorldPort/ILearningWorldPort";
import ILearningElementsDropdownPresenter from "./ILearningElementsDropdownPresenter";
import LearningElementsDropdownViewModel from "./LearningElementsDropdownViewModel";

export default class LearningElementsDropdownPresenter
  implements ILearningElementsDropdownPresenter
{
  constructor(private viewModel: LearningElementsDropdownViewModel) {}
  presentLearningElements(learningElements: LearningElementTO[]): void {
    this.viewModel.learningElementNames.Value = learningElements.map(
      (learningElement) => learningElement.name
    );

    this.viewModel.learningElements.Value = learningElements;
  }
}
