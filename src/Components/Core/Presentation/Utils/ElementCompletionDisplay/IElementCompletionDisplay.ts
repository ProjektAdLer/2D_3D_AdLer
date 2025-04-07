import { LearningElementInfo } from "src/Components/Core/Domain/Types/LearningElementInfo";

export default interface IElementCompletionDisplay {
  bottomTooltip(): JSX.Element;
  learningSpaceDetail(element: LearningElementInfo): JSX.Element;
}
