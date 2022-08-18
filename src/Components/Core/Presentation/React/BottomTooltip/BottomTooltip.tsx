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
      <StyledContainer>
        <div className="flex items-center gap-1 p-2 text-2xl font-extrabold text-white rounded-lg text-shadow bg-adlerblue">
          {getIcon(type)}
          {text}
        </div>
      </StyledContainer>
    </div>
  );
}
