import CustomDropdown from "../../ReactRelated/ReactBaseComponents/CustomDropdown";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import FullscreenSwitch from "~ReactComponents/SpaceDisplay/FullscreenSwitch/FullscreenSwitch";
import engineLogo from "../../../../../../Assets/icons/adLerEngine_flat_logo_simple.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import SpaceGoalPanel from "~ReactComponents/SpaceDisplay/SpaceGoalPanel/SpaceGoalPanel";
import ElementsDropdown from "~ReactComponents/SpaceDisplay/ElementsDropdown/ElementsDropdown";
import MenuBarViewModel from "./MenuBarViewModel";
import MenuBarController from "./MenuBarController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import menuIcon from "../../../../../../Assets/icons/23-world-menu/worldmenu-icon-nobg.svg";

export default function MenuBar() {
  const [viewModel, controller] = useBuilder<
    MenuBarViewModel,
    MenuBarController
  >(BUILDER_TYPES.IMenuBarBuilder);
  return (
    <CustomDropdown
      headerPart={
        <StyledButton>
          <img
            src={engineLogo}
            className="lg:w-20 md:w-16 sm:w-14"
            alt="EngineLogo"
          ></img>
        </StyledButton>
      }
      initialOpen={false}
      useAsTriggerOnly={true}
    >
      <StyledContainer className="flex flex-col bg-transparent">
        <FullscreenSwitch />
        <StyledButton onClick={controller.onExitButtonClicked}>
          <img src={menuIcon} alt="" />
        </StyledButton>
        <SpaceGoalPanel />
        <ElementsDropdown />
      </StyledContainer>
    </CustomDropdown>
  );
}
