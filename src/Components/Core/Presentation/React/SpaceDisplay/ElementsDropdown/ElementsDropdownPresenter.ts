import IElementsDropdownPresenter from "./IElementsDropdownPresenter";
import ElementsDropdownViewModel from "./ElementsDropdownViewModel";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";

export default class ElementsDropdownPresenter
  implements IElementsDropdownPresenter
{
  constructor(private viewModel: ElementsDropdownViewModel) {}

  onSpaceLoaded(spaceTO: LearningSpaceTO): void {
    this.viewModel.elementNames.Value = spaceTO.elements.map(
      (element) => element.name
    );

    this.viewModel.elements.Value = spaceTO.elements;
  }
}
