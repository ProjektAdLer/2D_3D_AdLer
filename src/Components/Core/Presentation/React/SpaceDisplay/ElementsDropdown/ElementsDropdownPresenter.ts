import ElementTO from "src/Components/Core/Application/DataTransferObjects/ElementTO";
import IDropdownPresenter from "./IElementsDropdownPresenter";
import ElementsDropdownViewModel from "./ElementsDropdownViewModel";

export default class ElementsDropdownPresenter implements IDropdownPresenter {
  constructor(private viewModel: ElementsDropdownViewModel) {}
  presentElements(elements: ElementTO[]): void {
    this.viewModel.elementNames.Value = elements.map((element) => element.name);

    this.viewModel.elements.Value = elements;
  }
}
