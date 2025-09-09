import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import FullscreenSwitchController from "./FullscreenSwitchController";
import FullscreenSwitchViewModel from "./FullscreenSwitchViewModel";
import fullscreenIcon from "../../../../../../Assets/icons/fullscreen.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import { useTranslation } from "react-i18next";

export default function FullscreenSwitch() {
  const [, controller] = useBuilder<
    FullscreenSwitchViewModel,
    FullscreenSwitchController
  >(BUILDER_TYPES.IFullscreenSwitchBuilder);

  const { t: translate } = useTranslation("learningSpace");

  if (!controller) return null;

  return (
    <StyledButton
      className=""
      onClick={controller.toggleFullscreen}
      title={translate("sidebar_fullscreenToolTip").toString()}
      data-testid="fullscreenswitch"
    >
      <img className="" src={fullscreenIcon} alt="Fullscreen-Icon"></img>
    </StyledButton>
  );
}
