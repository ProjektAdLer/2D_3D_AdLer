import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import StyledButton from "../ReactBaseComponents/StyledButton";
import FullscreenSwitchController from "./FullscreenSwitchController";
import FullscreenSwitchViewModel from "./FullscreenSwitchViewModel";
import fullscreenIcon from "../../../../../Assets/icons/fullscreen-icon.svg";

export default function FullscreenSwitch() {
  const [viewModels, controllers] = useViewModelControllerProvider<
    FullscreenSwitchViewModel,
    FullscreenSwitchController
  >(FullscreenSwitchViewModel);
  return (
    <StyledButton onClick={controllers[0]?.toggleFullscreen}>
      <img className="w-6 lg:w-10" src={fullscreenIcon}></img>
    </StyledButton>
  );
}
