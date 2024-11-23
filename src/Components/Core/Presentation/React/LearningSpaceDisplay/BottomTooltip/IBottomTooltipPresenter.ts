import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import { DoorTypeStrings } from "src/Components/Core/Domain/Types/DoorTypes";
import { LearningElementTypeStrings } from "src/Components/Core/Domain/Types/LearningElementTypes";

export default interface IBottomTooltipPresenter extends ILearningWorldAdapter {
  display(
    text: string,
    iconType?: LearningElementTypeStrings | DoorTypeStrings,
    points?: number | undefined,
    onClickCallback?: () => void,
  ): number;
  hide(toolTipId: number): void;
  hideAll(): void;
  show(): void;
  onLearningSpaceLoaded(learningSpaceTO: LearningSpaceTO): void;
}
