import CustomDropdown from "../../ReactRelated/ReactBaseComponents/CustomDropdown";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import FullscreenSwitch from "~ReactComponents/LearningSpaceDisplay/FullscreenSwitch/FullscreenSwitch";
import engineLogo from "../../../../../../Assets/icons/00-engine-logo/adler-engine-logo.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import LearningSpaceGoalPanel from "~ReactComponents/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanel";
import LearningElementsDropdown from "~ReactComponents/LearningSpaceDisplay/LearningElementsDropdown/LearningElementsDropdown";
import SideBarViewModel from "./SideBarViewModel";
import SideBarController from "./SideBarController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import menuIcon from "../../../../../../Assets/icons/23-world-menu/worldmenu-icon-nobg.svg";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";

export default function SideBar({ className }: AdLerUIComponent) {
  const [, controller] = useBuilder<SideBarViewModel, SideBarController>(
    BUILDER_TYPES.IMenuBarBuilder
  );
  return (
    <CustomDropdown
      className={tailwindMerge(className, "w-20")}
      headerPart={
        <StyledButton>
          <img
            src={engineLogo}
            className="lg:w-20 md:w-16 sm:w-14"
            alt="EngineLogo"
          ></img>
        </StyledButton>
      }
      // initialOpen has to be true for it to render properly on intialization
      // Depends on LoadSpace useCase within SpaceSceneDefinition
      initialOpen={true}
      useAsTriggerOnly={true}
    >
      <StyledContainer className="flex flex-col bg-transparent">
        <FullscreenSwitch />
        <StyledButton onClick={controller.onExitButtonClicked}>
          <img src={menuIcon} alt="" />
        </StyledButton>
        <LearningSpaceGoalPanel />
        <LearningElementsDropdown />
      </StyledContainer>
    </CustomDropdown>
  );
}
