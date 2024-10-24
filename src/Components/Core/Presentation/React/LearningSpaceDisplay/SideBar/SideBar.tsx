import CustomDropdown from "../../ReactRelated/ReactBaseComponents/CustomDropdown";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import FullscreenSwitch from "~ReactComponents/LearningSpaceDisplay/FullscreenSwitch/FullscreenSwitch";
import engineLogo from "../../../../../../Assets/icons/adler-engine.svg";
import hamburgerButton from "../../../../../../Assets/icons/hamburger-menu.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import SideBarViewModel from "./SideBarViewModel";
import SideBarController from "./SideBarController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import worldIcon from "../../../../../../Assets/icons/world-menu.svg";
import spaceMenuIcon from "../../../../../../Assets/icons/space-menu.svg";
import controlsIcon from "../../../../../../Assets/icons/controls.svg";
// import pauseIcon from "../../../../../../Assets/icons/pause.svg";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import HelpDeskButton from "~ReactComponents/GeneralComponents/HelpDeskButton/HelpDeskButton";
import HelpDeskModal from "~ReactComponents/GeneralComponents/HelpDeskModal/HelpDeskModal";
import { useTranslation } from "react-i18next";

export default function SideBar({ className }: Readonly<AdLerUIComponent>) {
  const [, controller] = useBuilder<SideBarViewModel, SideBarController>(
    BUILDER_TYPES.IMenuBarBuilder,
  );
  const { t: translate } = useTranslation("learningSpace");

  return (
    <CustomDropdown
      className={tailwindMerge(className, "w-20")}
      headerPart={
        <StyledButton>
          <img
            src={hamburgerButton}
            className="lg:w-20 md:w-16 sm:w-14"
            alt="EngineLogo"
          ></img>
        </StyledButton>
      }
      initialOpen={false}
      useAsTriggerOnly={true}
    >
      <StyledContainer className="flex flex-col p-2 rounded-lg w-44 lg:w-64 bg-whitetrans">
        <div className="flex flex-row items-center">
          <StyledButton onClick={controller.onMainMenuButtonClicked}>
            <img src={engineLogo} alt="" />
          </StyledButton>
          <p className="pl-2 text-sm font-bold lg:text-xl text-adlerdarkblue text-outline">
            {translate("sidebar_mainMenu")}
          </p>
        </div>

        <div className="flex flex-row items-center">
          <StyledButton onClick={controller.onWorldMenuButtonClicked}>
            <img src={worldIcon} alt="" />
          </StyledButton>
          <p className="pl-2 text-sm font-bold lg:text-xl text-adlerdarkblue text-outline">
            {translate("sidebar_learningWorldMenu")}
          </p>
        </div>

        <div className="flex flex-row items-center">
          <StyledButton onClick={controller.onSpaceMenuButtonClicked}>
            <img src={spaceMenuIcon} alt="" />
          </StyledButton>
          <p className="pl-2 text-sm font-bold lg:text-xl text-adlerdarkblue text-outline">
            {translate("sidebar_learningSpaceMenu")}
          </p>
        </div>

        {/* <div className="flex flex-row items-center">
          <StyledButton onClick={controller.onBreakTimeButtonClicked}>
            <img src={pauseIcon} alt="" />
          </StyledButton>
          <p className="pl-2 text-sm font-bold lg:text-xl text-adlerdarkblue text-outline">
            {translate("sidebar_breakTime")}
          </p>
        </div> */}

        <div className="flex flex-row items-center">
          <StyledButton onClick={controller.onControlsExplanationButtonClicked}>
            <img src={controlsIcon} alt="Steuerungserklärung" />
          </StyledButton>
          <p className="pl-2 text-sm font-bold lg:text-xl text-adlerdarkblue text-outline">
            {translate("sidebar_controls")}
          </p>
        </div>

        <div className="flex flex-row items-center">
          <FullscreenSwitch />
          <p className="pl-2 text-sm font-bold lg:text-xl text-adlerdarkblue text-outline">
            {translate("sidebar_fullScreen")}
          </p>
        </div>

        <div className="flex flex-row items-center">
          <HelpDeskButton />
          <HelpDeskModal />
          <p className="pl-2 text-sm font-bold lg:text-xl text-adlerdarkblue text-outline">
            {translate("sidebar_help")}
          </p>
        </div>
      </StyledContainer>
    </CustomDropdown>
  );
}
