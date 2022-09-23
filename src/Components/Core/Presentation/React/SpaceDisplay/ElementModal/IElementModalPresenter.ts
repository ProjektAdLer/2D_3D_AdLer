import ElementTO from "src/Components/Core/Application/DataTransferObjects/ElementTO";

export default interface IElementModalPresenter {
  presentElementModal(elementTO: ElementTO): void;
}
