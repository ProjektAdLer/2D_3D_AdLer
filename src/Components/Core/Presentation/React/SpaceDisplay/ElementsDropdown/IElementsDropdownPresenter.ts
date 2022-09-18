import ElementTO from "src/Components/Core/Application/DataTransportObjects/ElementTO";

export default interface IDropdownPresenter {
  presentElements(elements: ElementTO[]): void;
}
