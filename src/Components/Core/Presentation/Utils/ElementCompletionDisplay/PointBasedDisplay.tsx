import { LearningElementInfo } from "src/Components/Core/Domain/Types/LearningElementInfo";
import IElementCompletionDisplay from "./IElementCompletionDisplay";
import coinIcon from "../../../../../Assets/icons/coin.svg";

export default class PointBasedDisplay implements IElementCompletionDisplay {
  bottomTooltip(value: number | boolean): JSX.Element {
    return (
      <div className="flex items-center ml-2">
        {String(value)}
        <img src={coinIcon} alt="" className="w-8"></img>
      </div>
    );
  }

  learningSpaceDetail(element: LearningElementInfo): JSX.Element {
    return (
      <>
        {element.hasScored
          ? element.points + "/" + element.points
          : "0/" + element.points}
        <img
          src={coinIcon}
          className="self-center w-6 ml-1 portrait:w-4 lg:w-8"
          alt="Coin-Icon"
        ></img>
      </>
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
            {requiredText}
          </h3>
          <div className="flex flex-row ml-6 text-lg font-medium portrait:text-xs portrait:ml-2 mobile-landscape:text-sm">
            {required}
            <img
              src={coinIcon}
              className="self-center w-6 ml-1 portrait:w-4 lg:w-8"
              alt="Coin-Icon"
            ></img>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full xl:w-3/4">
          <h3 className="max-w-[75%] self-center ml-2 text-lg font-black portrait:text-sm  text-adlerdarkblue">
            {maxText}
          </h3>
          <div className="flex flex-row items-start ml-6 text-lg font-medium portrait:text-xs mobile-landscape:text-sm portrait:ml-2">
            {max}
            <img
              src={coinIcon}
              className="self-center w-6 ml-1 portrait:w-4 lg:w-8"
              alt="Coin-Icon"
            ></img>
          </div>
        </div>
      </section>
    );
  }
}
