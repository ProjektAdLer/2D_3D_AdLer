import CustomDropdown from "../../ReactRelated/ReactBaseComponents/CustomDropdown";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import FullscreenSwitch from "~ReactComponents/LearningSpaceDisplay/FullscreenSwitch/FullscreenSwitch";
import engineLogo from "../../../../../../Assets/icons/00-engine-logo/adler-engine-logo.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import SideBarViewModel from "./SideBarViewModel";
import SideBarController from "./SideBarController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import worldIcon from "../../../../../../Assets/icons/23-world-menu/worldmenu-icon-nobg.svg";
import spaceIcon from "../../../../../../Assets/icons/13-space/space-icon-nobg.svg";
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
        <div className="flex flex-row items-center w-64">
          <StyledButton onClick={controller.onSpaceMenuButtonClicked}>
            <img src={spaceIcon} alt="" />
          </StyledButton>
          <p className="pl-2 text-adlerdarkblue text-xl font-bold">
            Lernraum-Menü
          </p>
        </div>

        <div className="flex flex-row items-center w-64">
          <StyledButton onClick={controller.onWorldMenuButtonClicked}>
            <img src={worldIcon} alt="" />
          </StyledButton>
          <p className="pl-2 text-adlerdarkblue text-xl font-bold">
            Lernwelt-Menü
          </p>
        </div>

        <div className="flex flex-row items-center w-64">
          <StyledButton onClick={controller.onMainMenuButtonClicked}>
            <img src={engineLogo} alt="" />
          </StyledButton>
          <p className="pl-2 text-adlerdarkblue text-xl font-bold">Hauptmenü</p>
        </div>

        <FullscreenSwitch />
      </StyledContainer>
    </CustomDropdown>
  );
}
