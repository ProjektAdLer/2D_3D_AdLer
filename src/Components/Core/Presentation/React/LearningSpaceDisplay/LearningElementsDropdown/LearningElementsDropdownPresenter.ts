import ILearningElementsDropdownPresenter from "./ILearningElementsDropdownPresenter";
import LearningElementsDropdownViewModel from "./LearningElementsDropdownViewModel";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";

export default class LearningElementsDropdownPresenter
  implements ILearningElementsDropdownPresenter
{
  constructor(private viewModel: LearningElementsDropdownViewModel) {}

  onLearningSpaceLoaded(spaceTO: LearningSpaceTO): void {
    this.viewModel.elementNames.Value = spaceTO.elements.map(
      (element) => element.name
    );

    this.viewModel.elements.Value = spaceTO.elements;
  }
}
