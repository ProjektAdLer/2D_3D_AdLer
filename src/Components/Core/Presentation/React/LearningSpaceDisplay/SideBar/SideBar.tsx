import React, { useState, useEffect } from "react";
import CustomDropdown from "../../ReactRelated/ReactBaseComponents/CustomDropdown";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import FullscreenSwitch from "~ReactComponents/LearningSpaceDisplay/FullscreenSwitch/FullscreenSwitch";
import engineLogo from "../../../../../../Assets/icons/adler-engine.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import SideBarViewModel from "./SideBarViewModel";
import SideBarController from "./SideBarController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import worldIcon from "../../../../../../Assets/icons/world-menu.svg";
import spaceMenuIcon from "../../../../../../Assets/icons/space-menu.svg";
import controlsIcon from "../../../../../../Assets/icons/controls.svg";
import worldCompletedIcon from "../../../../../../Assets/icons/world-completed.svg";
import smartphoneIcon from "../../../../../../Assets/icons/smartphone.svg";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import HelpDeskButton from "~ReactComponents/GeneralComponents/HelpDeskButton/HelpDeskButton";
import HelpDeskModal from "~ReactComponents/GeneralComponents/HelpDeskModal/HelpDeskModal";
import { useTranslation } from "react-i18next";
import VERSION from "src";

export default function SideBar({ className }: Readonly<AdLerUIComponent>) {
  const [viewModel, controller] = useBuilder<
    SideBarViewModel,
    SideBarController
  >(BUILDER_TYPES.IMenuBarBuilder);
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
      <StyledContainer className="relative w-[11rem] md:w-[13rem] lg:w-60 border-8 rounded-2xl mobile-portrait:w-48 mobile-landscape:w-[65vw] mobile-landscape:max-h-64 mobile-landscape:ml-8 border-adlerdarkblue bg-white flex flex-col z-0">
        <header className="relative z-20 flex items-center justify-between w-full mt-1">
          <span className="ml-1 font-bold text-2xs lg:text-md text-adlerdarkblue">
            {time.toLocaleDateString()}
          </span>
          <span className="bg-adlerdarkblue h-2 w-2 rounded-full absolute left-[calc(50%-0.25rem)] mobile-landscape:hidden"></span>
          <span className="mr-1 font-bold text-right text-2xs lg:text-md text-adlerdarkblue">
            {time.toLocaleTimeString()} Uhr
          </span>
        </header>
        <span className="bg-adlerdarkblue h-2 w-2 rounded-full absolute left-[calc(50%-0.25rem)] mobile-landscape:left-2 mobile-landscape:top-[calc(50%-0.25rem)] hidden mobile-landscape:block"></span>
        <div className="z-20 grid grid-flow-row grid-cols-3 gap-1 p-1 rounded-lg mobile-landscape:ml-8 mobile-landscape:grid-flow-row mobile-landscape:auto-cols-max mobile-landscape:grid-rows-2 mobile-landscape:grid-cols-auto auto-rows-max">
          <div className="flex flex-col justify-start items-center max-h-[25%]">
            <StyledButton onClick={controller.onMainMenuButtonClicked}>
              <img src={engineLogo} alt="" />
            </StyledButton>
            <p className="font-bold text-center text-2xs lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_mainMenu")}
            </p>
          </div>

          <div className="flex flex-col justify-start items-center max-h-[25%]">
            <StyledButton onClick={controller.onWorldMenuButtonClicked}>
              <img src={worldIcon} alt="" />
            </StyledButton>
            <p className="font-bold text-center text-2xs lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_learningWorldMenu")}
            </p>
          </div>

          <div className="flex flex-col justify-startr items-center max-h-[25%]">
            <StyledButton onClick={controller.onSpaceMenuButtonClicked}>
              <img src={spaceMenuIcon} alt="" />
            </StyledButton>
            <p className="font-bold text-center text-2xs lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_learningSpaceMenu")}
            </p>
          </div>

          <div className="flex flex-col justify-start items-center max-h-[25%]">
            <StyledButton
              onClick={controller.onControlsExplanationButtonClicked}
            >
              <img src={controlsIcon} alt="Steuerungserklärung" />
            </StyledButton>
            <p className="font-bold text-center text-2xs lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_controls")}
            </p>
          </div>

          <div className="flex flex-col justify-startr items-center max-h-[25%]">
            <FullscreenSwitch />
            <p className="font-bold text-center text-2xs lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_fullScreen")}
            </p>
          </div>

          <div className="flex flex-col justify-start items-center max-h-[25%]">
            <HelpDeskButton />
            <HelpDeskModal />
            <p className="font-bold text-center text-2xs lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_help")}
            </p>
          </div>

          <div className="flex flex-col justify-start items-center max-h-[25%]">
            <StyledButton
              disabled={!viewModel.allowWorldCompletionModalButtonClick}
              onClick={controller.onWorldCompletionModalButtonClicked}
            >
              <img src={worldCompletedIcon} alt="Weltabschlussmodal" />
            </StyledButton>
            <p className="font-bold text-center text-2xs lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_worldCompleted")}
            </p>
          </div>

          <div className="flex flex-col justify-start items-center max-h-[25%]">
            <StyledButton
              onClick={controller.onNarrativeFrameworkIntroButtonClicked}
            >
              <img src={controlsIcon} alt="Steuerungserklärung" />
            </StyledButton>
            <p className="font-bold text-center break-all text-2xs lg:text-md text-adlerdarkblue text-outline">
              {translate("sidebar_narrativeFrameworkIntro")}
            </p>
          </div>
        </div>
        <footer className="relative z-20 flex items-center justify-between w-full mt-1">
          <span className="bg-adlerdarkblue h-2 w-1/6 rounded-full absolute left-[calc(41.6%-0.25rem)] mobile-landscape:hidden"></span>
          <span className="ml-1 font-bold text-2xs lg:text-md text-adlerdarkblue">
            {"Version: " + VERSION}
          </span>
        </footer>
        <img
          src={engineLogo}
          alt="inventory background"
          className="absolute right-0 z-10 w-64 mobile-landscape:w-48 mobile-landscape:bottom-4 opacity-20 bottom-24"
        />
      </StyledContainer>
    </CustomDropdown>
  );
}
