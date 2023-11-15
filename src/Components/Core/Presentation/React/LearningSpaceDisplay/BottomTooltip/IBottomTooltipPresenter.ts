import { LearningElementTypeStrings } from "src/Components/Core/Domain/Types/LearningElementTypes";

export default interface IBottomTooltipPresenter {
  display(
    text: string,
    iconType?: LearningElementTypeStrings,
    points?: number | undefined,
    onClickCallback?: () => void
  ): void;
  hide(): void;
}
