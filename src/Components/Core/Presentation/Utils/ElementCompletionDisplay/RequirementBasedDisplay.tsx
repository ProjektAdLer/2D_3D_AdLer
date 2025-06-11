import { LearningElementInfo } from "src/Components/Core/Domain/Types/LearningElementInfo";
import IElementCompletionDisplay from "./IElementCompletionDisplay";
import RequiredIcon from "../../../../../Assets/icons/required.svg";
import CheckIcon from "../../../../../Assets/icons/check-solution.svg";

export default class RequirementBasedDisplay
  implements IElementCompletionDisplay
{
  bottomTooltip(isCompleted: boolean): JSX.Element {
    // Zeigt das Anforderungssymbol und dahinter den Haken, wenn abgeschlossen.
    return (
      <div className="relative inline-block mr-4">
        <img src={RequiredIcon} alt="required" className="w-8" />
        {isCompleted && (
          <img
            src={CheckIcon}
            alt="completed"
            className="absolute h-6 lg:h-9 top-0 lg:-top-3 -right-3 lg:-right-6 "
          />
        )}
      </div>
    );
  }

  learningSpaceDetail(element: LearningElementInfo): JSX.Element {
    return element.points ? (
      <div className="relative inline-block">
        <img src={RequiredIcon} alt="required" className="w-8" />
        {element.hasScored && (
          <img
            src={CheckIcon}
            alt="completed"
            className="absolute -top-1 -right-4 w-6"
          />
        )}
      </div>
    ) : (
      <></>
    );
  }
}
