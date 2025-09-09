// Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarButtons.ts

import engineLogo from "../../../../../../Assets/icons/adler-engine.svg";
import worldIcon from "../../../../../../Assets/icons/world-menu.svg";
import worldStoryIcon from "../../../../../../Assets/icons/world-story.svg";
import spaceStoryIcon from "../../../../../../Assets/icons/space-story.svg";
import spaceMenuIcon from "../../../../../../Assets/icons/space-menu.svg";
import controlsIcon from "../../../../../../Assets/icons/controls.svg";
import worldCompletedIcon from "../../../../../../Assets/icons/world-completed.svg";
import badgeIcon from "../../../../../../Assets/badges/badge-1.png";
import SideBarViewModel from "./SideBarViewModel";
import ISideBarController from "./ISideBarController";

export interface SideBarButtonConfig {
  id: string;
  icon: string;
  tooltip: string;
  label: string;
  onClick: keyof ISideBarController;
  disabled?: (viewModel: SideBarViewModel) => boolean;
  visible?: (viewModel: SideBarViewModel) => boolean;
  isSpecialComponent?: boolean; // For FullscreenSwitch and HelpDeskButton
  component?: string; // Name of the special component
}

export const sideBarButtons: SideBarButtonConfig[] = [
  {
    id: "mainMenu",
    icon: engineLogo,
    tooltip: "sidebar_mainMenuToolTip",
    label: "sidebar_mainMenu",
    onClick: "onMainMenuButtonClicked",
  },
  {
    id: "worldMenu",
    icon: worldIcon,
    tooltip: "sidebar_learningWorldToolTip",
    label: "sidebar_learningWorldMenu",
    onClick: "onWorldMenuButtonClicked",
  },
  {
    id: "spaceMenu",
    icon: spaceMenuIcon,
    tooltip: "sidebar_learningSpaceToolTip",
    label: "sidebar_learningSpaceMenu",
    onClick: "onSpaceMenuButtonClicked",
  },
  {
    id: "controls",
    icon: controlsIcon,
    tooltip: "sidebar_controlsToolTip",
    label: "sidebar_controls",
    onClick: "onControlsExplanationButtonClicked",
  },
  {
    id: "introStory",
    icon: spaceStoryIcon,
    tooltip: "sidebar_introStoryToolTip",
    label: "sidebar_introStory",
    onClick: "onIntroStoryButtonClicked",
    visible: (viewModel) => viewModel.hasIntroStory,
    disabled: (viewModel) => !viewModel.allowIntroStoryButtonClick,
  },
  {
    id: "outroStory",
    icon: spaceStoryIcon,
    tooltip: "sidebar_outroStoryToolTip",
    label: "sidebar_outroStory",
    onClick: "onOutroStoryButtonClicked",
    visible: (viewModel) => viewModel.hasOutroStory,
    disabled: (viewModel) => !viewModel.allowOutroStoryButtonClick,
  },
  {
    id: "narrativeFramework",
    icon: worldStoryIcon,
    tooltip: "sidebar_narrativeFrameworkToolTip",
    label: "sidebar_narrativeFrameworkIntro",
    onClick: "onNarrativeFrameworkIntroButtonClicked",
    visible: (viewModel) =>
      viewModel.allowNarrativeFrameworkIntroButtonClick.Value,
  },
  {
    id: "worldCompletion",
    icon: worldCompletedIcon,
    tooltip: "sidebar_worldCompleteToolTip",
    label: "sidebar_worldCompleted",
    onClick: "onWorldCompletionModalButtonClicked",
    disabled: (viewModel) => !viewModel.allowWorldCompletionModalButtonClick,
  },
  {
    id: "fullscreen",
    icon: "", // Not used since isSpecialComponent is true
    tooltip: "sidebar_fullScreenToolTip",
    label: "sidebar_fullScreen",
    onClick: "onMainMenuButtonClicked", // Dummy, not used
    isSpecialComponent: true,
    component: "FullscreenSwitch",
  },
  {
    id: "help",
    icon: "", // Not used since isSpecialComponent is true
    tooltip: "sidebar_helpToolTip",
    label: "sidebar_help",
    onClick: "onMainMenuButtonClicked", // Dummy, not used
    isSpecialComponent: true,
    component: "HelpDesk",
  },
  {
    id: "badgeOverview",
    icon: badgeIcon,
    tooltip: "sidebar_badgeOverviewToolTip",
    label: "sidebar_badgeOverview",
    onClick: "onBadgeOverviewButtonClicked",
  },
];
