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
import React, { useState, useEffect } from "react";

export default function SideBar({ className }: Readonly<AdLerUIComponent>) {
  const [, controller] = useBuilder<SideBarViewModel, SideBarController>(
    BUILDER_TYPES.IMenuBarBuilder,
  );
  const { t: translate } = useTranslation("learningSpace");
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      <StyledContainer className="flex flex-col rounded-lg w-44 lg:w-64 bg-white border-8 border-black h-fit">
        <header className="h-4 flex pb-1 pr-1 justify-end relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-black rounded-b-lg w-24 h-6"></div>
          <div className="roboto font-bold text-adlerdarkblue">
            {dateTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </header>
        <section className="grid grid-cols-3 grid-rows-4 gap-2 mt-2">
          <div className="flex flex-col items-center">
            <StyledButton onClick={controller.onMainMenuButtonClicked}>
              <img src={engineLogo} alt="" />
            </StyledButton>
            <p className="pl-2 text-sm font-bold text-adlerdarkblue">
              {translate("sidebar_mainMenu")}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <StyledButton onClick={controller.onWorldMenuButtonClicked}>
              <img src={worldIcon} alt="" />
            </StyledButton>
            <p className="pl-2 text-sm font-bold text-adlerdarkblue">
              {translate("sidebar_learningWorldMenu")}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <StyledButton onClick={controller.onSpaceMenuButtonClicked}>
              <img src={spaceMenuIcon} alt="" />
            </StyledButton>
            <p className="pl-2 text-sm font-bold text-adlerdarkblue">
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

          <div className="flex flex-col items-center">
            <StyledButton
              onClick={controller.onControlsExplanationButtonClicked}
            >
              <img src={controlsIcon} alt="Steuerungserklärung" />
            </StyledButton>
            <p className="pl-2 text-sm font-bold text-adlerdarkblue">
              {translate("sidebar_controls")}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <FullscreenSwitch />
            <p className="pl-2 text-sm font-bold text-adlerdarkblue">
              {translate("sidebar_fullScreen")}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <HelpDeskButton />
            <HelpDeskModal />
            <p className="pl-2 text-sm font-bold text-adlerdarkblue">
              {translate("sidebar_help")}
            </p>
          </div>
        </section>
        <footer className="h-4 flex pb-1 pr-1 justify-end relative">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-1 bg-white border-4 border-black rounded-full w-12 h-12"></div>
        </footer>

        {/* <div className="flex flex-row items-center">
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
        </div>

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
        </div> */}
      </StyledContainer>
    </CustomDropdown>
  );
}
