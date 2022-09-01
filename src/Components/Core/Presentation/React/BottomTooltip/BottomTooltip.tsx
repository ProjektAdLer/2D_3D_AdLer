import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/CustomHooks/useBuilder";
import { getIcon } from "../../Utils/GetIcon";
import useObservable from "../CustomHooks/useObservable";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import BottomTooltipViewModel from "./BottomTooltipViewModel";
export default function BottomTooltip() {
  const [viewModel] = useBuilder<BottomTooltipViewModel, undefined>(
    BUILDER_TYPES.IBottomTooltipBuilder
  );
  const [show] = useObservable<boolean>(viewModel?.show);
  const [type] = useObservable<string>(viewModel?.iconType);
  const [text] = useObservable<string>(viewModel?.text);

  if (!show || !text || !type) return null;

  return (
    <div className="grid justify-center">
      <StyledContainer>
        <div className="flex items-center gap-1 p-2 text-2xl font-extrabold text-white rounded-lg text-shadow bg-adlerblue">
          {getIcon(type)}
          {text}
        </div>
      </StyledContainer>
    </div>
  );
}
