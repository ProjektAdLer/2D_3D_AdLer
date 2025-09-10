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
import { AdLerUIComponent } from "../../../../Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import {
  DoorTypes,
  DoorTypeStrings,
} from "src/Components/Core/Domain/Types/DoorTypes";
import { getDoorIcon } from "../../../Utils/GetDoorIcon";
import { useTranslation } from "react-i18next";

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
  const [points] = useObservable<number | undefined>(viewModel.points);
  const [xp] = useObservable<number | undefined>(viewModel.xp);
  const [isRequired] = useObservable<boolean | undefined>(viewModel.isRequired);

  const { t: translate } = useTranslation("learningSpace");

  if (!show || !iconType) return null;

  return (
    <div
      className={tailwindMerge(
        className,
        "pointer-events-none bottom-2 flex w-full justify-center md:bottom-10",
      )}
    >
      <StyledContainer
        className="pointer-events-auto cursor-pointer"
        onClick={viewModel.onClickCallback.Value} // didn't use useObservable because react has problems with functions in states
        tooltip={translate("bottomToolTip").toString()}
        data-testid={`bottomtooltip-${viewModel.text}`}
      >
        <div className="text-md flex items-center gap-1 rounded-lg bg-buttonbgblue p-2 font-bold text-adlerdarkblue transition duration-75 ease-in-out hover:border-b-2 hover:border-r-2 hover:border-adlerdarkblue hover:bg-adleryellow active:translate-x-[1px] active:translate-y-[1px] active:border-b-2 active:border-r-2 active:border-transparent lg:p-4 lg:text-2xl portrait:animate-wiggle portrait:border-b-2 portrait:border-r-2 portrait:border-adlerdarkblue">
          {iconType !== LearningElementTypes.notAnElement &&
            iconType !== DoorTypes.entryDoor &&
            iconType !== DoorTypes.exitDoor &&
            getLearningElementIcon(iconType)}
          {viewModel.hasScored.Value && getCheckIcon()}
          {(iconType === DoorTypes.entryDoor ||
            iconType === DoorTypes.exitDoor) &&
            getDoorIcon(iconType)}
          {text}
          {viewModel.gradingStyle.bottomTooltip({
            points: points,
            xp: xp,
            isRequired: isRequired,
            hasScored: viewModel.hasScored.Value,
            iconType: iconType,
          })}
        </div>
      </StyledContainer>
    </div>
  );
}
