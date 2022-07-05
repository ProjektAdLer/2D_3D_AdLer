import { getIcon } from "../../Utils/GetIcon";
import useObservable from "../CustomHooks/useObservable";
import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import BottomTooltipViewModel from "./BottomTooltipViewModel";
export default function BottomTooltip() {
  const [viewModels] = useViewModelControllerProvider<BottomTooltipViewModel>(
    BottomTooltipViewModel
  );
  const [show] = useObservable<boolean>(viewModels[0]?.show);
  const [type] = useObservable<string>(viewModels[0]?.iconType);
  const [text] = useObservable<string>(viewModels[0]?.text);

  if (!show || viewModels.length === 0) return null;

  return (
    <div className="grid justify-center">
      <StyledContainer className="text-white font-extrabold text-shadow text-2xl bg-adlerblue">
        {getIcon(type)}
        {text}
      </StyledContainer>
    </div>
  );
}
