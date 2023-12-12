import { LearningElementTypeStrings } from "src/Components/Core/Domain/Types/LearningElementTypes";

export default interface IBottomTooltipPresenter {
  display(
    text: string,
    iconType?: LearningElementTypeStrings,
    points?: number | undefined,
    onClickCallback?: () => void
  ): number;
  hide(toolTipId: number): void;
  hideAll(): void;
  show(): void;
}
