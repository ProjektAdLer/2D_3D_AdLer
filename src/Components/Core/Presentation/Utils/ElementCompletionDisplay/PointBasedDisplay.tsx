import { LearningElementInfo } from "src/Components/Core/Domain/Types/LearningElementInfo";
import IElementCompletionDisplay, {
  BottomTooltipDisplayData,
} from "./IElementCompletionDisplay";
import coinIcon from "../../../../../Assets/icons/coin.svg";
import { LearningElementTypes } from "src/Components/Core/Domain/Types/LearningElementTypes";
import { DoorTypes } from "src/Components/Core/Domain/Types/DoorTypes";

export default class PointBasedDisplay implements IElementCompletionDisplay {
  bottomTooltip(data: BottomTooltipDisplayData): JSX.Element {
    // Only show points for actual learning elements, not for doors or NPCs
    const isActualLearningElement =
      data.iconType !== LearningElementTypes.notAnElement &&
      data.iconType !== DoorTypes.entryDoor &&
      data.iconType !== DoorTypes.exitDoor;

    if (isActualLearningElement && data.points !== undefined) {
      return (
        <div className="ml-2 flex items-center">
          {String(data.points)}
          <img src={coinIcon} alt="Points" className="w-8"></img>
        </div>
      );
    }
    return <></>; // Return empty fragment if no points should be shown
  }

  learningSpaceDetail(element: LearningElementInfo): JSX.Element {
    return (
      <>
        {element.hasScored
          ? element.points + "/" + element.points
          : "0/" + element.points}
        <img
          src={coinIcon}
          className="ml-1 w-6 self-center lg:w-8 portrait:w-4"
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
        <div className="flex w-full flex-row items-center justify-between xl:w-3/4">
          <h3 className="ml-2 max-w-[75%] self-center text-lg font-black text-adlerdarkblue mobile-landscape:text-sm portrait:text-sm">
            {requiredText}
          </h3>
          <div className="ml-6 flex flex-row text-lg font-medium mobile-landscape:text-sm portrait:ml-2 portrait:text-xs">
            {required}
            <img
              src={coinIcon}
              className="ml-1 w-6 self-center lg:w-8 portrait:w-4"
              alt="Coin-Icon"
            ></img>
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-between xl:w-3/4">
          <h3 className="ml-2 max-w-[75%] self-center text-lg font-black text-adlerdarkblue mobile-landscape:text-sm portrait:text-sm">
            {maxText}
          </h3>
          <div className="ml-6 flex flex-row items-start text-lg font-medium mobile-landscape:text-sm portrait:ml-2 portrait:text-xs">
            {max}
            <img
              src={coinIcon}
              className="ml-1 w-6 self-center lg:w-8 portrait:w-4"
              alt="Coin-Icon"
            ></img>
          </div>
        </div>
      </section>
    );
  }
}
