import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";

export default interface IBottomTooltipPresenter {
  displayDoorTooltip(doorType: string): void;
  displayLearningElementSummaryTooltip(element: LearningElementTO): void;
  hide(): void;
}
