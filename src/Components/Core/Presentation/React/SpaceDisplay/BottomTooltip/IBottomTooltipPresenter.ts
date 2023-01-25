import ElementTO from "src/Components/Core/Application/DataTransferObjects/ElementTO";

export default interface IBottomTooltipPresenter {
  displayExitQueryTooltip(): void;
  displayElementSummaryTooltip(element: ElementTO): void;
  hide(): void;
}
