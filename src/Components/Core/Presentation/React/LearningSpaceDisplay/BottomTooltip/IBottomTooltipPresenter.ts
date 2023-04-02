import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";

export default interface IBottomTooltipPresenter {
  displayExitQueryTooltip(): void;
  displayLearningElementSummaryTooltip(element: LearningElementTO): void;
  hide(): void;
}
