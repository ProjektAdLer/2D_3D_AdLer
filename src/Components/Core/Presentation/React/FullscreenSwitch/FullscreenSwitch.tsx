import StyledButton from "../ReactBaseComponents/StyledButton";
import FullscreenSwitchController from "./FullscreenSwitchController";
import FullscreenSwitchViewModel from "./FullscreenSwitchViewModel";
import fullscreenIcon from "../../../../../Assets/icons/fullscreen-icon.svg";
import useBuilder from "~ReactComponents/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";

export default function FullscreenSwitch() {
  const [, controller] = useBuilder<
    FullscreenSwitchViewModel,
    FullscreenSwitchController
  >(BUILDER_TYPES.IFullscreenSwitchBuilder);

  if (!controller) return null;

  return (
    <StyledButton onClick={controller.toggleFullscreen}>
      <img className="w-6 lg:w-10" src={fullscreenIcon}></img>
    </StyledButton>
  );
}
