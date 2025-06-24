import { LearningElementInfo } from "src/Components/Core/Domain/Types/LearningElementInfo";
import IElementCompletionDisplay, {
  BottomTooltipDisplayData,
} from "./IElementCompletionDisplay";
import RequiredIcon from "../../../../../Assets/icons/required.svg";
import CheckIcon from "../../../../../Assets/icons/check-solution.svg";
import XPIcon from "../../../../../Assets/icons/xp.svg";

export default class RequirementBasedDisplay
  implements IElementCompletionDisplay
{
  bottomTooltip(data: BottomTooltipDisplayData): JSX.Element {
    return (
      <div className="flex items-center gap-1">
        {data.isRequired && (
          <div className="relative inline-block">
            <img src={RequiredIcon} alt="required" className="w-7" />
            {data.hasScored && (
              <img
                src={CheckIcon}
                alt="completed"
                className="absolute w-5 -top-1 -right-3"
              />
            )}
          </div>
        )}
        {data.xp !== undefined && data.xp > 0 && (
          <div className="flex items-center ml-1">
            <span className="font-semibold">{Math.round(data.xp)}</span>
            <img src={XPIcon} alt="XP" className="w-5 h-5 ml-0.5" />
          </div>
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
