import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import {
  LearningElementTypes,
  LearningElementTypeStrings,
} from "../../../../Domain/Types/LearningElementTypes";
import { getLearningElementIcon } from "../../../Utils/GetLearningElementIcon";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import StyledContainer from "../../ReactRelated/ReactBaseComponents/StyledContainer";
import BottomTooltipViewModel from "./BottomTooltipViewModel";
import coinIcon from "../../../../../../Assets/icons/08-coin/coin-icon-nobg.svg";
import { AdLerUIComponent } from "../../../../Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";

export default function BottomTooltip({
  className,
}: Readonly<AdLerUIComponent>) {
  const [viewModel] = useBuilder<BottomTooltipViewModel, undefined>(
    BUILDER_TYPES.IBottomTooltipBuilder
  );

  const [show] = useObservable<boolean>(viewModel.show);
  const [type] = useObservable<LearningElementTypeStrings>(viewModel.iconType);
  const [text] = useObservable<string>(viewModel.text);
  const [points] = useObservable<number>(viewModel.points);
  const [showPoints] = useObservable<boolean>(viewModel.showPoints);

  if (!show || !type) return null;

  return (
    <div
      className={tailwindMerge(
        className,
        "absolute flex justify-center w-screen bottom-2 md:bottom-10"
      )}
    >
      <StyledContainer
        className="cursor-pointer"
        onClick={viewModel.onClickCallback.Value} // didn't use useObservable because react has problems with functions in states
      >
        <div className="flex items-center gap-1 p-2 font-bold rounded-lg lg:p-4 text-adlerdarkblue text-md lg:text-2xl bg-buttonbgblue">
          {type !== LearningElementTypes.notAnElement &&
            getLearningElementIcon(type)}
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
