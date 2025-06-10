import { LearningElementInfo } from "src/Components/Core/Domain/Types/LearningElementInfo";
import IElementCompletionDisplay from "./IElementCompletionDisplay";
import RequiredIcon from "../../../../../Assets/icons/required.svg";
import CheckIcon from "../../../../../Assets/icons/check-solution.svg";

export default class RequirementBasedDisplay
  implements IElementCompletionDisplay
{
  bottomTooltip(value: number | boolean): JSX.Element {
    return value ? (
      <div className="relative inline-block">
        <img src={RequiredIcon} alt="required" className="w-8" />
        {value === true && (
          <img
            src={CheckIcon}
            alt="completed"
            className="absolute top-0 right-0 w-8"
          />
        )}
      </div>
    ) : (
      <> </>
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
            className="absolute top-0 -right-3 w-6"
          />
        )}
      </div>
    ) : (
      <> </>
    );
  }
}
