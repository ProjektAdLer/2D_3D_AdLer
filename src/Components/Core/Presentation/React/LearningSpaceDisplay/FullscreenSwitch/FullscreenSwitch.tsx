import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import FullscreenSwitchController from "./FullscreenSwitchController";
import FullscreenSwitchViewModel from "./FullscreenSwitchViewModel";
import fullscreenIcon from "../../../../../../Assets/icons/fullscreen.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";

export default function FullscreenSwitch() {
  const [, controller] = useBuilder<
    FullscreenSwitchViewModel,
    FullscreenSwitchController
  >(BUILDER_TYPES.IFullscreenSwitchBuilder);

  if (!controller) return null;

  return (
    <StyledButton className="" onClick={controller.toggleFullscreen}>
      <img className="" src={fullscreenIcon} alt="Fullscreen-Icon"></img>
    </StyledButton>
  );
}
