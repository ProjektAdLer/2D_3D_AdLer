import IElementsDropdownPresenter from "./IElementsDropdownPresenter";
import ElementsDropdownViewModel from "./ElementsDropdownViewModel";
import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";
import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";

export default class ElementsDropdownPresenter
  implements IElementsDropdownPresenter, ISpaceAdapter
{
  constructor(private viewModel: ElementsDropdownViewModel) {}

  onSpaceDataLoaded(spaceTO: SpaceTO): void {
    this.viewModel.elementNames.Value = spaceTO.elements.map(
      (element) => element.name
    );

    this.viewModel.elements.Value = spaceTO.elements;
  }
}
