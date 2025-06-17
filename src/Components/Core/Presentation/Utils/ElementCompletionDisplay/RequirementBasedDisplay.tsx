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
            className="absolute top-0 h-6 lg:h-9 lg:-top-3 -right-3 lg:-right-6 "
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
            className="absolute w-6 -top-1 -right-4"
          />
        )}
      </div>
    ) : (
      <></>
    );
  }

  learningSpaceDetailSummary(
    required: number,
    requiredText: string,
    max: number,
    maxText: string,
  ): JSX.Element {
    return (
      <section className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between w-full xl:w-3/4">
          <h3 className="self-center max-w-[75%] ml-2 text-lg font-black portrait:text-sm mobile-landscape:text-sm text-adlerdarkblue">
            {"Benötigte Elemente:"}
          </h3>
          <div className="flex flex-row ml-6 text-lg font-medium portrait:text-xs portrait:ml-2 mobile-landscape:text-sm">
            {required}
            <img
              src={RequiredIcon}
              className="self-center w-6 ml-1 portrait:w-4 lg:w-8"
              alt="Coin-Icon"
            ></img>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full xl:w-3/4">
          <h3 className="max-w-[75%] self-center ml-2 text-lg font-black portrait:text-sm  text-adlerdarkblue">
            {"Maximal bearbeitbare Elemente:"}
          </h3>
          <div className="flex flex-row items-start ml-6 text-lg font-medium portrait:text-xs mobile-landscape:text-sm portrait:ml-2">
            {max}
            <img
              src={RequiredIcon}
              className="self-center w-6 ml-1 portrait:w-4 lg:w-8"
              alt="Coin-Icon"
            ></img>
          </div>
        </div>
      </section>
    );
  }
}
