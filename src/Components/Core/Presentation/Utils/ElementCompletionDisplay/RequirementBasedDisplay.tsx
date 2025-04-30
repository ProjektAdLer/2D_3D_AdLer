import { LearningElementInfo } from "src/Components/Core/Domain/Types/LearningElementInfo";
import IElementCompletionDisplay from "./IElementCompletionDisplay";

export default class RequirementBasedDisplay
  implements IElementCompletionDisplay
{
  bottomTooltip(value: number | boolean): JSX.Element {
    return <></>;
  }

  learningSpaceDetail(element: LearningElementInfo): JSX.Element {
    return <></>;
  }
}
