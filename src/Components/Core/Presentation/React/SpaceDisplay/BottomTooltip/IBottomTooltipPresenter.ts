import ElementTO from "src/Components/Core/Application/DataTransferObjects/ElementTO";

export default interface IBottomTooltipPresenter {
  displayElement(element: ElementTO): void;
  hide(): void;
}
