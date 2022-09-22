import ElementTO from "src/Components/Core/Application/DataTransferObjects/ElementTO";

export default interface IDropdownPresenter {
  presentElements(elements: ElementTO[]): void;
}
