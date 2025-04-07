import { LearningElementInfo } from "src/Components/Core/Domain/Types/LearningElementInfo";
import IElementCompletionDisplay from "./IElementCompletionDisplay";
import coinIcon from "../../../../../Assets/icons/coin.svg";

export default class PointBasedDisplay implements IElementCompletionDisplay {
  bottomTooltip(): JSX.Element {
    // (
    //   <div className="flex items-center ml-2">
    //     {points}
    //     <img src={coinIcon} alt="" className="w-8"></img>
    //   </div>
    // )
    return <></>;
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
}
