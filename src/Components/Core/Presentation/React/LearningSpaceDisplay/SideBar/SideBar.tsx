import React, { useState, useEffect } from "react";
import CustomDropdown from "../../ReactRelated/ReactBaseComponents/CustomDropdown";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import FullscreenSwitch from "~ReactComponents/LearningSpaceDisplay/FullscreenSwitch/FullscreenSwitch";
import engineLogo from "../../../../../../Assets/icons/adler-engine.svg";
// import hamburgerButton from "../../../../../../Assets/icons/hamburger-menu.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import SideBarViewModel from "./SideBarViewModel";
import SideBarController from "./SideBarController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import worldIcon from "../../../../../../Assets/icons/world-menu.svg";
import spaceMenuIcon from "../../../../../../Assets/icons/space-menu.svg";
import controlsIcon from "../../../../../../Assets/icons/controls.svg";
import smartphoneIcon from "../../../../../../Assets/icons/smartphone.svg";
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
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <CustomDropdown
      className={tailwindMerge(className, "w-20")}
      headerPart={
        <StyledButton>
          <img
            src={smartphoneIcon}
            className="lg:w-20 md:w-16 sm:w-14"
            alt="EngineLogo"
          ></img>
        </StyledButton>
      }
      initialOpen={false}
      useAsTriggerOnly={true}
    >
      {/*<StyledContainer className="flex flex-col p-2 rounded-lg w-44 lg:w-64 border-8 border-black bg-whitetrans ">*/}
      <StyledContainer className="relative w-[11rem] md:w-[13rem] lg:w-60 border-8 rounded-2xl mobile-landscape:w-[60vw] border-adlerdarkblue bg-white flex flex-col z-0">
        <header className="flex justify-between w-full items-center mt-1 relative z-20">
          <span className="ml-1 text-2xs font-bold lg:text-md text-adlerdarkblue">
            {time.toLocaleDateString()}
          </span>
          <span className="bg-adlerdarkblue h-2 w-2 rounded-full absolute left-[calc(50%-0.25rem)] mobile-landscape:hidden"></span>
          <span className="mr-1 text-2xs text-right font-bold lg:text-md text-adlerdarkblue">
            {time.toLocaleTimeString()} Uhr
          </span>
        </header>
        <span className="bg-adlerdarkblue h-2 w-2 rounded-full absolute left-[calc(50%-0.25rem)] mobile-landscape:left-2 mobile-landscape:top-[calc(50%-0.25rem)]"></span>
        <div className="grid mobile-landscape:ml-4 mobile-landscape:grid-flow-col mobile-landscape:auto-cols-max mobile-landscape:grid-rows-2 mobile-landscape:grid-cols-auto grid-flow-row auto-rows-max gap-1 p-1 rounded-lg grid-cols-3 z-20">
          <div className="flex flex-col justify-start items-center max-h-[25%]">
            <StyledButton onClick={controller.onMainMenuButtonClicked}>
              <img src={engineLogo} alt="" />
            </StyledButton>
            <p className="text-2xs text-center font-bold lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_mainMenu")}
            </p>
          </div>

          <div className="flex flex-col justify-start items-center max-h-[25%]">
            <StyledButton onClick={controller.onWorldMenuButtonClicked}>
              <img src={worldIcon} alt="" />
            </StyledButton>
            <p className="text-2xs text-center font-bold lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_learningWorldMenu")}
            </p>
          </div>

          <div className="flex flex-col justify-startr items-center max-h-[25%]">
            <StyledButton onClick={controller.onSpaceMenuButtonClicked}>
              <img src={spaceMenuIcon} alt="" />
            </StyledButton>
            <p className="text-2xs text-center font-bold lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_learningSpaceMenu")}
            </p>
          </div>

          {/* <div className="flex flex-col justify-start items-center max-h-[25%]">
            <StyledButton onClick={controller.onBreakTimeButtonClicked}>
              <img src={pauseIcon} alt="" />
            </StyledButton>
            <p className="text-2xs text-center font-bold lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_breakTime")}
            </p>
          </div> */}

          <div className="flex flex-col justify-start items-center max-h-[25%]">
            <StyledButton
              onClick={controller.onControlsExplanationButtonClicked}
            >
              <img src={controlsIcon} alt="Steuerungserklärung" />
            </StyledButton>
            <p className="text-2xs text-center font-bold lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_controls")}
            </p>
          </div>

          <div className="flex flex-col justify-startr items-center max-h-[25%]">
            <FullscreenSwitch />
            <p className="text-2xs text-center font-bold lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_fullScreen")}
            </p>
          </div>

          <div className="flex flex-col justify-start items-center max-h-[25%]">
            <HelpDeskButton />
            <HelpDeskModal />
            <p className="text-2xs text-center font-bold lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_help")}
            </p>
          </div>

          {/* Empty placeholder containers for future functions/buttons */}
          <div className="flex flex-col justify-start items-center max-h-[25%]">
            <StyledButton
              onClick={controller.onControlsExplanationButtonClicked}
            >
              <img src={controlsIcon} alt="Steuerungserklärung" />
            </StyledButton>
            <p className="text-2xs text-center font-bold lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_controls")}
            </p>
          </div>

          <div className="flex flex-col justify-start items-center max-h-[25%] invisible ">
            <StyledButton
              onClick={controller.onControlsExplanationButtonClicked}
            >
              <img src={controlsIcon} alt="Steuerungserklärung" />
            </StyledButton>
            <p className="text-2xs text-center font-bold lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_controls")}
            </p>
          </div>

          <div className="flex flex-col justify-start items-center max-h-[25%] invisible ">
            <StyledButton
              onClick={controller.onControlsExplanationButtonClicked}
            >
              <img src={controlsIcon} alt="Steuerungserklärung" />
            </StyledButton>
            <p className="text-2xs text-center font-bold lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_controls")}
            </p>
          </div>

          <div className="flex flex-col justify-start items-center max-h-[25%] invisible ">
            <StyledButton
              onClick={controller.onControlsExplanationButtonClicked}
            >
              <img src={controlsIcon} alt="Steuerungserklärung" />
            </StyledButton>
            <p className="text-2xs text-center font-bold lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_controls")}
            </p>
          </div>

          <div className="flex flex-col justify-start items-center max-h-[25%] invisible ">
            <StyledButton
              onClick={controller.onControlsExplanationButtonClicked}
            >
              <img src={controlsIcon} alt="Steuerungserklärung" />
            </StyledButton>
            <p className="text-2xs text-center font-bold lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_controls")}
            </p>
          </div>

          <div className="flex flex-col justify-start items-center max-h-[25%] invisible ">
            <StyledButton
              onClick={controller.onControlsExplanationButtonClicked}
            >
              <img src={controlsIcon} alt="Steuerungserklärung" />
            </StyledButton>
            <p className="text-2xs text-center font-bold lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_controls")}
            </p>
          </div>
          {/* End of empty placeholder containers*/}
        </div>
        <footer className="z-20 self-center w-1/4 h-2 m-1 rounded-sm bg-adlerdarkblue"></footer>
        <img
          src={engineLogo}
          alt="inventory background"
          className="mobile-landscape:w-48 mobile-landscape:bottom-4 w-64 opacity-20 absolute bottom-24 right-0 z-10"
        />
      </StyledContainer>
    </CustomDropdown>
  );
}
