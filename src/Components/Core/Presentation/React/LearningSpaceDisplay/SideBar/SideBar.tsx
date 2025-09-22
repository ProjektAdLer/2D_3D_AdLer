import { useState, useEffect } from "react";
import CustomDropdown from "../../ReactRelated/ReactBaseComponents/CustomDropdown";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import engineLogo from "../../../../../../Assets/icons/adler-engine.svg";
import smartphoneIcon from "../../../../../../Assets/icons/smartphone.svg";
import leftArrowIcon from "../../../../../../Assets/icons/left.svg";
import rightArrowIcon from "../../../../../../Assets/icons/right.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import SideBarViewModel from "./SideBarViewModel";
import ISideBarController from "./ISideBarController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { useTranslation } from "react-i18next";
import { config } from "src/config";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import SideBarButton from "./SideBarButton";
import { SideBarButtonConfig } from "./SideBarButtons";

export default function SideBar({ className }: Readonly<AdLerUIComponent>) {
  const [viewModel, controller] = useBuilder<
    SideBarViewModel,
    ISideBarController
  >(BUILDER_TYPES.IMenuBarBuilder);
  const { t: translate } = useTranslation("learningSpace");
  const [time, setTime] = useState(new Date());

  // Observables für Paginierung
  const [currentPage] = useObservable(viewModel?.currentPage);
  const [totalPages] = useObservable(viewModel?.totalPages);
  const [enableNarrativeFrameWorkButton] = useObservable<boolean>(
    viewModel?.allowNarrativeFrameworkIntroButtonClick,
  );
  const [isMobile] = useObservable(viewModel?.isMobile);

  useEffect(() => {
    if (!viewModel) return;

    const mobileLandscape = window.matchMedia(
      "only screen and (max-height: 400px) and (orientation: landscape)",
    );
    const mobilePortrait = window.matchMedia(
      "only screen and (max-width: 431px) and (orientation: portrait)",
    );

    const checkIsMobile = () => {
      viewModel.isMobile.Value =
        mobileLandscape.matches || mobilePortrait.matches;
    };

    checkIsMobile();

    const listener = () => checkIsMobile();

    mobileLandscape.addEventListener("change", listener);
    mobilePortrait.addEventListener("change", listener);

    return () => {
      mobileLandscape.removeEventListener("change", listener);
      mobilePortrait.removeEventListener("change", listener);
    };
  }, [viewModel]);

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

  // Update total pages when relevant observables change
  useEffect(() => {
    if (viewModel) {
      viewModel.updateTotalPages();
    }
  }, [
    viewModel,
    enableNarrativeFrameWorkButton,
    viewModel?.hasIntroStory,
    viewModel?.hasOutroStory,
  ]);

  // Update total pages when relevant observables change
  useEffect(() => {
    if (viewModel) {
      viewModel.updateTotalPages();
    }
  }, [
    viewModel,
    enableNarrativeFrameWorkButton,
    viewModel?.hasIntroStory,
    viewModel?.hasOutroStory,
    isMobile, // Add isMobile to dependency array
  ]);

  if (!viewModel || !controller) return null;

  // Calculate visible buttons for the current page
  const visibleButtons = viewModel.getVisibleButtons();
  const startIndex = (currentPage - 1) * viewModel.buttonsPerPage;
  const endIndex = startIndex + viewModel.buttonsPerPage;
  const currentPageButtons = visibleButtons.slice(startIndex, endIndex);

  return (
    <CustomDropdown
      className={tailwindMerge(className, "w-20")}
      headerPart={
        <StyledButton
          title={translate("sidebar_menuToolTip").toString()}
          data-testid="sidebar-menu"
        >
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
      <StyledContainer className="relative z-0 flex !h-[28rem] !max-h-[28rem] !min-h-[28rem] w-[11rem] flex-col overflow-hidden rounded-2xl border-8 border-adlerdarkblue bg-white md:w-[13rem] lg:w-60 mobile-landscape:ml-8 mobile-landscape:w-[65vw] mobile-portrait:w-48">
        {/* Header with time */}
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

        {/* Button Grid */}
        <div className="mobile-landscape:grid-cols-auto z-20 grid flex-1 grid-flow-row grid-cols-3 content-start gap-x-1 gap-y-5 rounded-lg p-1 pt-3 mobile-landscape:ml-8 mobile-landscape:auto-cols-max mobile-landscape:grid-flow-row mobile-landscape:grid-rows-2">
          {currentPageButtons.map((button: SideBarButtonConfig) => (
            <SideBarButton
              key={button.id}
              button={button}
              viewModel={viewModel}
              controller={controller}
            />
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="z-20 mt-1 flex justify-center gap-2 pb-1">
            <StyledButton
              onClick={() => controller.previousPage()}
              disabled={currentPage === 1}
              title={translate("sidebar_previousPage").toString()}
              shape="smallSquare"
              data-testid="sidebar-page-previous"
            >
              <img src={leftArrowIcon} alt="previous" className="h-3 w-3" />
            </StyledButton>
            <span className="flex items-center text-2xs font-bold text-adlerdarkblue">
              {`${currentPage} / ${totalPages}`}
            </span>
            <StyledButton
              onClick={() => controller.nextPage()}
              disabled={currentPage === totalPages}
              title={translate("sidebar_nextPage").toString()}
              shape="smallSquare"
              data-testid="sidebar-page-next"
            >
              <img src={rightArrowIcon} alt="next" className="h-3 w-3" />
            </StyledButton>
          </div>
        )}

        {/* Footer with version */}
        <footer className="relative z-20 mt-1 flex w-full items-center justify-between">
          <span className="absolute left-[calc(41.6%-0.25rem)] h-2 w-1/6 rounded-full bg-adlerdarkblue mobile-landscape:hidden"></span>
          <span className="lg:text-md ml-1 text-2xs font-bold text-adlerdarkblue">
            {"Version: " + config.version}
          </span>
        </footer>

        {/* Background logo */}
        <img
          src={engineLogo}
          alt="inventory background"
          className="absolute bottom-24 right-0 z-10 w-64 opacity-20 mobile-landscape:bottom-4 mobile-landscape:w-48"
        />
      </StyledContainer>
    </CustomDropdown>
  );
}
