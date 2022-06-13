import ILearningElementsDropdownPresenter from "./ILearningElementsDropdownPresenter";
import LearningElementsDropdownViewModel from "./LearningElementsDropdownViewModel";

export default class LearningElementsDropdownPresenter
  implements ILearningElementsDropdownPresenter
{
  constructor(private viewModel: LearningElementsDropdownViewModel) {}
}
