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
import ScorePanelBuilder from "../../Presentation/React/SpaceDisplay/ScorePanel/ScorePanelBuilder";
import NotificationManagerBuilder from "../../Presentation/React/GeneralComponents/NotificationManager/NotificationManagerBuilder";
import BUILDER_TYPES from "./BUILDER_TYPES";
import LoginComponentBuilder from "../../Presentation/React/WelcomePage/LoginComponent/LoginComponentBuilder";
import BottomTooltipBuilder from "../../Presentation/React/SpaceDisplay/BottomTooltip/BottomTooltipBuilder";
import SpaceNamePanelBuilder from "../../Presentation/React/SpaceDisplay/SpaceNamePanel/SpaceNamePanelBuilder";
import FullscreenSwitchBuilder from "../../Presentation/React/SpaceDisplay/FullscreenSwitch/FullscreenSwitchBuilder";
import SpaceGoalPanelBuilder from "~ReactComponents/SpaceDisplay/SpaceGoalPanel/SpaceGoalPanelBuilder";
import MenuHeaderBarBuilder from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBarBuilder";
import SpaceSelectionBuilder from "~ReactComponents/SpaceMenu/SpaceSelection/SpaceSelectionBuilder";
import SpaceDetailBuilder from "~ReactComponents/SpaceMenu/SpaceDetail/SpaceDetailBuilder";
import SpaceCompletionModalBuilder from "~ReactComponents/SpaceDisplay/SpaceCompletionModal/SpaceCompletionModalBuilder";
import WorldCompletionModalBuilder from "~ReactComponents/SpaceMenu/WorldCompletionModal/WorldCompletionModalBuilder";
import SideBarBuilder from "~ReactComponents/SpaceDisplay/SideBar/SideBarBuilder";
import UseGuideBuilder from "~ReactComponents/SpaceDisplay/UseGuide/UseGuideBuilder";
import WorldMenuButtonBuilder from "~ReactComponents/WelcomePage/WorldMenuButton/WorldMenuButtonBuilder";
import AvatarCameraBuilder from "../../Presentation/Babylon/AvatarCamera/AvatarCameraBuilder";
import ExitModalBuilder from "~ReactComponents/SpaceDisplay/ExitModal/ExitModalBuilder";
import WorldSelectionBuilder from "~ReactComponents/WorldMenu/WorldSelection/WorldSelectionBuilder";
import WorldDetailBuilder from "~ReactComponents/WorldMenu/WorldDetail/WorldDetailBuilder";

const BuilderDIContainer = new ContainerModule((bind) => {
  bind<IPresentationDirector>(BUILDER_TYPES.IPresentationDirector).to(
    PresentationDirector
  );

  bind<IPresentationBuilder>(BUILDER_TYPES.IDoorBuilder).to(DoorBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.IScorePanelBuilder).to(
    ScorePanelBuilder
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
  bind<IPresentationBuilder>(BUILDER_TYPES.ILoginButtonBuilder).to(
    LoginComponentBuilder
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
    MenuHeaderBarBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ISpaceSelectionBuilder).to(
    SpaceSelectionBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ISpaceDetailBuilder).to(
    SpaceDetailBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IWorldDetailBuilder).to(
    WorldDetailBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ISpaceCompletionModalBuilder).to(
    SpaceCompletionModalBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IWorldCompletionModalBuilder).to(
    WorldCompletionModalBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IMenuBarBuilder).to(SideBarBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.IUseGuideBuilder).to(
    UseGuideBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IWorldMenuButtonBuilder).to(
    WorldMenuButtonBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IAvatarCameraBuilder).to(
    AvatarCameraBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IExitModalBuilder).to(
    ExitModalBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IWorldSelectionBuilder).to(
    WorldSelectionBuilder
  );
});

export default BuilderDIContainer;
