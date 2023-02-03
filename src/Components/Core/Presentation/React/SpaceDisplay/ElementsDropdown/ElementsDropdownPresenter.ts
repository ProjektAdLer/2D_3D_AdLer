import IElementsDropdownPresenter from "./IElementsDropdownPresenter";
import ElementsDropdownViewModel from "./ElementsDropdownViewModel";
import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";

export default class ElementsDropdownPresenter
  implements IElementsDropdownPresenter
{
  constructor(private viewModel: ElementsDropdownViewModel) {}

  onSpaceLoaded(spaceTO: SpaceTO): void {
    this.viewModel.elementNames.Value = spaceTO.elements.map(
      (element) => element.name
    );

    this.viewModel.elements.Value = spaceTO.elements;
  }
}
