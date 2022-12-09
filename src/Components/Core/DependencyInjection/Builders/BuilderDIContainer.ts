import { ContainerModule } from "inversify";
import AvatarBuilder from "../../Presentation/Babylon/Avatar/AvatarBuilder";
import DoorBuilder from "../../Presentation/Babylon/Door/DoorBuilder";
import ElementBuilder from "../../Presentation/Babylon/Elements/ElementBuilder";
import SpaceBuilder from "../../Presentation/Babylon/Spaces/SpaceBuilder";
import IPresentationBuilder from "../../Presentation/PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../Presentation/PresentationBuilder/IPresentationDirector";
import PresentationDirector from "../../Presentation/PresentationBuilder/PresentationDirector";
import ElementModalBuilder from "../../Presentation/React/SpaceDisplay/ElementModal/ElementModalBuilder";
import ElementsDropdownBuilder from "../../Presentation/React/SpaceDisplay/ElementsDropdown/ElementsDropdownBuilder";
import MoodleLoginFormBuilder from "../../Presentation/React/GeneralComponents/MoodleLoginForm/MoodleLoginFormBuilder";
import ScorePanelBuilder from "../../Presentation/React/SpaceDisplay/ScorePanel/ScorePanelBuilder";
import NotificationManagerBuilder from "../../Presentation/React/GeneralComponents/NotificationManager/NotificationManagerBuilder";
import BUILDER_TYPES from "./BUILDER_TYPES";
import MoodleLoginButtonBuilder from "../../Presentation/React/WelcomePage/MoodleLoginButton/MoodleLoginButtonBuilder";
import BottomTooltipBuilder from "../../Presentation/React/SpaceDisplay/BottomTooltip/BottomTooltipBuilder";
import SpaceNamePanelBuilder from "../../Presentation/React/SpaceDisplay/SpaceNamePanel/SpaceNamePanelBuilder";
import FullscreenSwitchBuilder from "../../Presentation/React/SpaceDisplay/FullscreenSwitch/FullscreenSwitchBuilder";
import SpaceGoalPanelBuilder from "~ReactComponents/SpaceDisplay/SpaceGoalPanel/SpaceGoalPanelBuilder";
import HeaderBarBuilder from "~ReactComponents/SpaceMenu/HeaderBar/HeaderBarBuilder";
import SpaceSelectionBuilder from "~ReactComponents/SpaceMenu/SpaceSelection/SpaceSelectionBuilder";
import DetailSectionBuilder from "~ReactComponents/SpaceMenu/DetailSection/DetailSectionBuilder";
import SpaceCompletionModalBuilder from "~ReactComponents/SpaceDisplay/SpaceCompletionModal/SpaceCompletionModalBuilder";
import WorldCompletionModalBuilder from "~ReactComponents/SpaceMenu/WorldCompletionModal/WorldCompletionModalBuilder";
import MenuBarBuilder from "~ReactComponents/GeneralComponents/MenuBar/MenuBarBuilder";
import UseGuideBuilder from "~ReactComponents/SpaceDisplay/UseGuide/UseGuideBuilder";
import WorldMenuButtonBuilder from "~ReactComponents/WelcomePage/WorldMenuButton/WorldMenuButtonBuilder";
import AvatarCameraBuilder from "../../Presentation/Babylon/AvatarCamera/AvatarCameraBuilder";

const BuilderDIContainer = new ContainerModule((bind) => {
  bind<IPresentationDirector>(BUILDER_TYPES.IPresentationDirector).to(
    PresentationDirector
  );

  bind<IPresentationBuilder>(BUILDER_TYPES.IDoorBuilder).to(DoorBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.IScorePanelBuilder).to(
    ScorePanelBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IMoodleLoginFormBuilder).to(
    MoodleLoginFormBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IElementModalBuilder).to(
    ElementModalBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ISpaceBuilder).to(SpaceBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.IElementBuilder).to(ElementBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.IAvatarBuilder).to(AvatarBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.IElementsDropdownBuilder).to(
    ElementsDropdownBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IModalManagerBuilder).to(
    NotificationManagerBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IMoodleLoginButtonBuilder).to(
    MoodleLoginButtonBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IBottomTooltipBuilder).to(
    BottomTooltipBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IWorldNamePanelBuilder).to(
    SpaceNamePanelBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IFullscreenSwitchBuilder).to(
    FullscreenSwitchBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ISpaceGoalPanelBuilder).to(
    SpaceGoalPanelBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IHeaderBarBuilder).to(
    HeaderBarBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ISpaceSelectionBuilder).to(
    SpaceSelectionBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IDetailSectionBuilder).to(
    DetailSectionBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ISpaceCompletionModalBuilder).to(
    SpaceCompletionModalBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IWorldCompletionModalBuilder).to(
    WorldCompletionModalBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IMenuBarBuilder).to(MenuBarBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.IUseGuideBuilder).to(
    UseGuideBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IWorldMenuButtonBuilder).to(
    WorldMenuButtonBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IAvatarCameraBuilder).to(
    AvatarCameraBuilder
  );
});

export default BuilderDIContainer;
