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

export default function BottomTooltip() {
  const [viewModel] = useBuilder<BottomTooltipViewModel, undefined>(
    BUILDER_TYPES.IBottomTooltipBuilder
  );
  const [show] = useObservable<boolean>(viewModel?.show);
  const [type] = useObservable<LearningElementTypeStrings>(viewModel?.iconType);
  const [text] = useObservable<string>(viewModel?.text);
  const [points] = useObservable<number | undefined>(viewModel?.points);

  if (!show || !type) return null;

  return (
    <div className="absolute bottom-0 flex justify-center w-screen pointer-events-none md:bottom-10 ">
      <StyledContainer>
        <div className="flex items-center gap-1 p-2 font-bold rounded-lg lg:p-4 text-adlerdarkblue text-md lg:text-2xl bg-buttonbgblue">
          {type !== LearningElementTypes.notAnElement &&
            getLearningElementIcon(type)}
          {text}
          {!points ?? (
            <div className="flex items-center ml-2">
              {points}
              <div className="ml-2"></div>
              <img src={coinIcon} alt="" className="w-8"></img>
            </div>
          )}
        </div>
      </StyledContainer>
    </div>
  );
}
