import { useState, useEffect } from "react";
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
import worldStoryIcon from "../../../../../../Assets/icons/world-story.svg";
import spaceStoryIcon from "../../../../../../Assets/icons/space-story.svg";
import spaceMenuIcon from "../../../../../../Assets/icons/space-menu.svg";
import controlsIcon from "../../../../../../Assets/icons/controls.svg";
import worldCompletedIcon from "../../../../../../Assets/icons/world-completed.svg";
import smartphoneIcon from "../../../../../../Assets/icons/smartphone.svg";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import HelpDeskButton from "~ReactComponents/GeneralComponents/HelpDeskButton/HelpDeskButton";
import HelpDeskModal from "~ReactComponents/GeneralComponents/HelpDeskModal/HelpDeskModal";
import { useTranslation } from "react-i18next";
import { config } from "src/config";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";

export default function SideBar({ className }: Readonly<AdLerUIComponent>) {
  const [viewModel, controller] = useBuilder<
    SideBarViewModel,
    SideBarController
  >(BUILDER_TYPES.IMenuBarBuilder);
  const { t: translate } = useTranslation("learningSpace");
  const [time, setTime] = useState(new Date());
  const [enableNarrativeFrameWorkButton] = useObservable<boolean>(
    viewModel?.allowNarrativeFrameworkIntroButtonClick,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (controller) {
      controller.checkNarrativeFramework();
    }
  }, [controller]);

  if (!viewModel || !controller) return null;

  return (
    <CustomDropdown
      className={tailwindMerge(className, "w-20")}
      headerPart={
        <StyledButton title={translate("sidebar_menuToolTip").toString()}>
          <img
            src={smartphoneIcon}
            className="sm:w-14 md:w-16 lg:w-20"
            alt="EngineLogo"
          ></img>
        </StyledButton>
      }
      initialOpen={false}
      useAsTriggerOnly={true}
    >
      <StyledContainer className="relative z-0 flex w-[11rem] flex-col rounded-2xl border-8 border-adlerdarkblue bg-white md:w-[13rem] lg:w-60 mobile-landscape:ml-8 mobile-landscape:max-h-64 mobile-landscape:w-[65vw] mobile-portrait:w-48">
        <header className="relative z-20 mt-1 flex w-full items-center justify-between">
          <span className="lg:text-md ml-1 text-2xs font-bold text-adlerdarkblue">
            {time.toLocaleDateString()}
          </span>
          <span className="absolute left-[calc(50%-0.25rem)] h-2 w-2 rounded-full bg-adlerdarkblue mobile-landscape:hidden"></span>
          <span className="lg:text-md mr-1 text-right text-2xs font-bold text-adlerdarkblue">
            {time.toLocaleTimeString()} Uhr
          </span>
        </header>
        <span className="absolute left-[calc(50%-0.25rem)] hidden h-2 w-2 rounded-full bg-adlerdarkblue mobile-landscape:left-2 mobile-landscape:top-[calc(50%-0.25rem)] mobile-landscape:block"></span>
        <div className="mobile-landscape:grid-cols-auto z-20 grid grid-flow-row auto-rows-max grid-cols-3 gap-1 rounded-lg p-1 mobile-landscape:ml-8 mobile-landscape:auto-cols-max mobile-landscape:grid-flow-row mobile-landscape:grid-rows-2">
          <div className="flex max-h-[25%] flex-col items-center justify-start">
            <StyledButton
              onClick={controller.onMainMenuButtonClicked}
              title={translate("sidebar_mainMenuToolTip").toString()}
            >
              <img src={engineLogo} alt="" />
            </StyledButton>
            <p className="lg:text-md text-outline text-center text-2xs font-bold text-adlerdarkblue">
              {translate("sidebar_mainMenu")}
            </p>
          </div>

          <div className="flex max-h-[25%] flex-col items-center justify-start">
            <StyledButton
              onClick={controller.onWorldMenuButtonClicked}
              title={translate("sidebar_learningWorldToolTip").toString()}
            >
              <img src={worldIcon} alt="" />
            </StyledButton>
            <p className="lg:text-md text-outline text-center text-2xs font-bold text-adlerdarkblue">
              {translate("sidebar_learningWorldMenu")}
            </p>
          </div>

          <div className="justify-startr flex max-h-[25%] flex-col items-center">
            <StyledButton
              onClick={controller.onSpaceMenuButtonClicked}
              title={translate("sidebar_learningSpaceToolTip").toString()}
            >
              <img src={spaceMenuIcon} alt="" />
            </StyledButton>
            <p className="lg:text-md text-outline text-center text-2xs font-bold text-adlerdarkblue">
              {translate("sidebar_learningSpaceMenu")}
            </p>
          </div>

          <div className="flex max-h-[25%] flex-col items-center justify-start">
            <StyledButton
              onClick={controller.onControlsExplanationButtonClicked}
              title={translate("sidebar_controlsToolTip").toString()}
            >
              <img src={controlsIcon} alt="Steuerungserklärung" />
            </StyledButton>
            <p className="lg:text-md text-outline text-center text-2xs font-bold text-adlerdarkblue">
              {translate("sidebar_controls")}
            </p>
          </div>

          <div className="justify-startr flex max-h-[25%] flex-col items-center">
            <FullscreenSwitch />
            <p className="lg:text-md text-outline text-center text-2xs font-bold text-adlerdarkblue">
              {translate("sidebar_fullScreen")}
            </p>
          </div>

          <div className="flex max-h-[25%] flex-col items-center justify-start">
            <HelpDeskButton />
            <HelpDeskModal />
            <p className="lg:text-md text-outline text-center text-2xs font-bold text-adlerdarkblue">
              {translate("sidebar_help")}
            </p>
          </div>

          <div className="flex max-h-[25%] flex-col items-center justify-start">
            <StyledButton
              disabled={!viewModel.allowWorldCompletionModalButtonClick}
              onClick={controller.onWorldCompletionModalButtonClicked}
              title={translate("sidebar_worldCompleteToolTip").toString()}
            >
              <img src={worldCompletedIcon} alt="Weltabschlussmodal" />
            </StyledButton>
            <p className="lg:text-md text-outline text-center text-2xs font-bold text-adlerdarkblue">
              {translate("sidebar_worldCompleted")}
            </p>
          </div>

          {enableNarrativeFrameWorkButton && (
            <div className="flex max-h-[25%] flex-col items-center justify-start">
              <StyledButton
                onClick={controller.onNarrativeFrameworkIntroButtonClicked}
                title={translate(
                  "sidebar_narrativeFrameworkToolTip",
                ).toString()}
              >
                <img src={worldStoryIcon} alt="Welt-Story" />
              </StyledButton>
              <p className="lg:text-md text-outline break-all text-center text-2xs font-bold text-adlerdarkblue">
                {translate("sidebar_narrativeFrameworkIntro")}
              </p>
            </div>
          )}

          {viewModel.hasIntroStory && (
            <div className="flex max-h-[25%] flex-col items-center justify-start">
              <StyledButton
                disabled={!viewModel.allowIntroStoryButtonClick}
                onClick={controller.onIntroStoryButtonClicked}
                title={translate("sidebar_introStoryToolTip").toString()}
              >
                <img src={spaceStoryIcon} alt="Intro-Story" />
              </StyledButton>
              <p className="lg:text-md text-outline break-all text-center text-2xs font-bold text-adlerdarkblue">
                {translate("sidebar_introStory")}
              </p>
            </div>
          )}

          {viewModel.hasOutroStory && (
            <div className="flex max-h-[25%] flex-col items-center justify-start">
              <StyledButton
                disabled={!viewModel.allowOutroStoryButtonClick}
                onClick={controller.onOutroStoryButtonClicked}
                title={translate("sidebar_outroStoryToolTip").toString()}
              >
                <img src={spaceStoryIcon} alt="Outro-Story" />
              </StyledButton>
              <p className="lg:text-md text-outline break-all text-center text-2xs font-bold text-adlerdarkblue">
                {translate("sidebar_outroStory")}
              </p>
            </div>
          )}
        </div>
        <footer className="relative z-20 mt-1 flex w-full items-center justify-between">
          <span className="absolute left-[calc(41.6%-0.25rem)] h-2 w-1/6 rounded-full bg-adlerdarkblue mobile-landscape:hidden"></span>
          <span className="lg:text-md ml-1 text-2xs font-bold text-adlerdarkblue">
            {"Version: " + config.version}
          </span>
        </footer>
        <img
          src={engineLogo}
          alt="inventory background"
          className="absolute bottom-24 right-0 z-10 w-64 opacity-20 mobile-landscape:bottom-4 mobile-landscape:w-48"
        />
      </StyledContainer>
    </CustomDropdown>
  );
}
