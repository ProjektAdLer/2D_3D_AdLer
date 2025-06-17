import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import { DoorTypeStrings } from "src/Components/Core/Domain/Types/DoorTypes";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";
import { LearningElementTypeStrings } from "src/Components/Core/Domain/Types/LearningElementTypes";
import Observable from "src/Lib/Observable";

export default interface IBottomTooltipPresenter extends ILearningWorldAdapter {
  display(
    text: string,
    iconType?: LearningElementTypeStrings | DoorTypeStrings,
    points?: number | undefined,
    hasScored?: Observable<boolean> | undefined,
    onClickCallback?: () => void,
    elementXP?: number | null, // Hinzugefügter Parameter für XP
  ): number;
  hide(toolTipId: number): void;
  hideAll(): void;
  show(): void;
  onLearningSpaceLoaded(learningSpaceTO: LearningSpaceTO): void;
}
