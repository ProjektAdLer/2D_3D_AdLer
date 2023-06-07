import { LearningElementTypeStrings } from "src/Components/Core/Domain/Types/LearningElementTypes";

export default interface IBottomTooltipPresenter {
  displayDoorTooltip(doorType: string): void;
  displayLearningElementSummaryTooltip(elementData: {
    name: string;
    type: LearningElementTypeStrings;
    points: number | undefined;
  }): void;
  hide(): void;
}
