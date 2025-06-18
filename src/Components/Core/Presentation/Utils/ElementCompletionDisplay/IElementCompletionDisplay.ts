import { LearningElementInfo } from "src/Components/Core/Domain/Types/LearningElementInfo";
import { LearningElementTypeStrings } from "src/Components/Core/Domain/Types/LearningElementTypes";
import { DoorTypeStrings } from "src/Components/Core/Domain/Types/DoorTypes";

export interface BottomTooltipDisplayData {
  points?: number;
  isRequired?: boolean;
  xp?: number;
  hasScored?: boolean;
  iconType: LearningElementTypeStrings | DoorTypeStrings;
}

export default interface IElementCompletionDisplay {
  bottomTooltip(data: BottomTooltipDisplayData): JSX.Element;
  learningSpaceDetail(element: LearningElementInfo): JSX.Element;
  learningSpaceDetailSummary(
    required: number,
    requiredText: string,
    max: number,
    maxText: string,
  ): JSX.Element;
}
