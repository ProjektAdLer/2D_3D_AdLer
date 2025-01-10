import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import {
  LearningElementTypes,
  LearningElementTypeStrings,
} from "../../../../Domain/Types/LearningElementTypes";
import {
  getCheckIcon,
  getLearningElementIcon,
} from "../../../Utils/GetLearningElementIcon";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import StyledContainer from "../../ReactRelated/ReactBaseComponents/StyledContainer";
import BottomTooltipViewModel from "./BottomTooltipViewModel";
import coinIcon from "../../../../../../Assets/icons/coin.svg";
import { AdLerUIComponent } from "../../../../Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import {
  DoorTypes,
  DoorTypeStrings,
} from "src/Components/Core/Domain/Types/DoorTypes";
import { getDoorIcon } from "../../../Utils/GetDoorIcon";

export default function BottomTooltip({
  className,
}: Readonly<AdLerUIComponent>) {
  const [viewModel] = useBuilder<BottomTooltipViewModel, undefined>(
    BUILDER_TYPES.IBottomTooltipBuilder,
  );

  const [show] = useObservable<boolean>(viewModel.show);
  const [iconType] = useObservable<
    LearningElementTypeStrings | DoorTypeStrings
  >(viewModel.iconType);
  const [text] = useObservable<string>(viewModel.text);
  const [points] = useObservable<number>(viewModel.points);
  const [showPoints] = useObservable<boolean>(viewModel.showPoints);

  if (!show || !iconType) return null;

  return (
    <div
      className={tailwindMerge(
        className,
        "flex justify-center w-full bottom-2 md:bottom-10 pointer-events-none ",
      )}
    >
      <StyledContainer
        className="cursor-pointer pointer-events-auto"
        onClick={viewModel.onClickCallback.Value} // didn't use useObservable because react has problems with functions in states
      >
        <div className="flex items-center gap-1 p-2 font-bold rounded-lg lg:p-4 text-adlerdarkblue text-md lg:text-2xl bg-buttonbgblue hover:bg-adleryellow hover:border-adlerdarkblue portrait:border-b-2 portrait:border-r-2 portrait:border-adlerdarkblue portrait:animate-wiggle transition ease-in-out duration-75 active:translate-x-[1px] active:translate-y-[1px] active:border-b-2 active:border-r-2 hover:border-b-2 hover:border-r-2 active:border-transparent">
          {iconType !== LearningElementTypes.notAnElement &&
            iconType !== DoorTypes.entryDoor &&
            iconType !== DoorTypes.exitDoor &&
            getLearningElementIcon(iconType)}
          {viewModel.hasScored.Value && getCheckIcon()}
          {(iconType === DoorTypes.entryDoor ||
            iconType === DoorTypes.exitDoor) &&
            getDoorIcon(iconType)}
          {text}
          {showPoints && (
            <div className="flex items-center ml-2">
              {points}
              <img src={coinIcon} alt="" className="w-8"></img>
            </div>
          )}
        </div>
      </StyledContainer>
    </div>
  );
}
