import { LearningElementInfo } from "src/Components/Core/Domain/Types/LearningElementInfo";

export default interface IElementCompletionDisplay {
  bottomTooltip(value: number | boolean): JSX.Element;
  learningSpaceDetail(element: LearningElementInfo): JSX.Element;
  learningSpaceDetailSummary(
    required: number,
    requiredText: string,
    max: number,
    maxText: string,
  ): JSX.Element;
}
