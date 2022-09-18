import ElementTO from "src/Components/Core/Application/DataTransportObjects/ElementTO";

export default interface IElementModalPresenter {
  presentElementModal(elementTO: ElementTO): void;
}
