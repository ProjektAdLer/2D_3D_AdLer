import ElementTO from "src/Components/Core/Application/DataTransportObjects/ElementTO";

export default interface IBottomTooltipPresenter {
  displayElement(element: ElementTO): void;
  hide(): void;
}
