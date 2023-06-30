import { ContainerModule } from "inversify";
import AvatarBuilder from "../../Presentation/Babylon/Avatar/AvatarBuilder";
import DoorBuilder from "../../Presentation/Babylon/Door/DoorBuilder";
import LearningElementBuilder from "../../Presentation/Babylon/LearningElements/LearningElementBuilder";
import LearningSpaceBuilder from "../../Presentation/Babylon/LearningSpaces/LearningSpaceBuilder";
import IPresentationBuilder from "../../Presentation/PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../Presentation/PresentationBuilder/IPresentationDirector";
import PresentationDirector from "../../Presentation/PresentationBuilder/PresentationDirector";
import ElementModalBuilder from "../../Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalBuilder";
import LearningElementsDropdownBuilder from "../../Presentation/React/LearningSpaceDisplay/LearningElementsDropdown/LearningElementsDropdownBuilder";
import LearningWorldScorePanelBuilder from "../../Presentation/React/LearningSpaceDisplay/LearningWorldScorePanel/LearningWorldScorePanelBuilder";
import NotificationManagerBuilder from "../../Presentation/React/GeneralComponents/NotificationManager/NotificationManagerBuilder";
import BUILDER_TYPES from "./BUILDER_TYPES";
import LoginComponentBuilder from "../../Presentation/React/WelcomePage/LoginComponent/LoginComponentBuilder";
import BottomTooltipBuilder from "../../Presentation/React/LearningSpaceDisplay/BottomTooltip/BottomTooltipBuilder";
import SpaceNamePanelBuilder from "../../Presentation/React/LearningSpaceDisplay/LearningSpaceNamePanel/LearningSpaceNamePanelBuilder";
import FullscreenSwitchBuilder from "../../Presentation/React/LearningSpaceDisplay/FullscreenSwitch/FullscreenSwitchBuilder";
import LearningSpaceGoalPanelBuilder from "~ReactComponents/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanelBuilder";
import MenuHeaderBarBuilder from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBarBuilder";
import SpaceSelectionBuilder from "~ReactComponents/LearningSpaceMenu/LearningSpaceSelection/LearningSpaceSelectionBuilder";
import LearningSpaceDetailBuilder from "~ReactComponents/LearningSpaceMenu/LearningSpaceDetail/LearningSpaceDetailBuilder";
import LearningWorldCompletionModalBuilder from "~ReactComponents/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModalBuilder";
import SideBarBuilder from "~ReactComponents/LearningSpaceDisplay/SideBar/SideBarBuilder";
import LearningWorldMenuButtonBuilder from "~ReactComponents/WelcomePage/LearningWorldMenuButton/LearningWorldMenuButtonBuilder";
import AvatarCameraBuilder from "../../Presentation/Babylon/AvatarCamera/AvatarCameraBuilder";
import ExitModalBuilder from "~ReactComponents/LearningSpaceDisplay/ExitModal/ExitModalBuilder";
import LearningWorldSelectionBuilder from "~ReactComponents/LearningWorldMenu/LearningWorldSelection/LearningWorldSelectionBuilder";
import LearningWorldDetailBuilder from "~ReactComponents/LearningWorldMenu/LearningWorldDetail/LearningWorldDetailBuilder";
import AmbienceBuilder from "../../Presentation/Babylon/Ambience/AmbienceBuilder";
import WindowBuilder from "../../Presentation/Babylon/Window/WindowBuilder";
import LearningSpaceScorePanelBuilder from "~ReactComponents/LearningSpaceDisplay/LearningSpaceScorePanel/LearningSpaceScorePanelBuilder";
import DecorationBuilder from "../../Presentation/Babylon/Decoration/DecorationBuilder";
import StandInDecorationBuilder from "../../Presentation/Babylon/StandInDecoration/StandInDecorationBuilder";

const BuilderDIContainer = new ContainerModule((bind) => {
  bind<IPresentationDirector>(BUILDER_TYPES.IPresentationDirector).to(
    PresentationDirector
  );

  bind<IPresentationBuilder>(BUILDER_TYPES.IDoorBuilder).to(DoorBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.IWindowBuilder).to(WindowBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningSpaceScorePanelBuilder).to(
    LearningSpaceScorePanelBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningWorldScorePanelBuilder).to(
    LearningWorldScorePanelBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningElementModalBuilder).to(
    ElementModalBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningSpaceBuilder).to(
    LearningSpaceBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningElementBuilder).to(
    LearningElementBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IAvatarBuilder).to(AvatarBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningElementsDropdownBuilder).to(
    LearningElementsDropdownBuilder
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
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningWorldNamePanelBuilder).to(
    SpaceNamePanelBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IFullscreenSwitchBuilder).to(
    FullscreenSwitchBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningSpaceGoalPanelBuilder).to(
    LearningSpaceGoalPanelBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IHeaderBarBuilder).to(
    MenuHeaderBarBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningSpaceSelectionBuilder).to(
    SpaceSelectionBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningSpaceDetailBuilder).to(
    LearningSpaceDetailBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningWorldDetailBuilder).to(
    LearningWorldDetailBuilder
  );
  bind<IPresentationBuilder>(
    BUILDER_TYPES.ILearningWorldCompletionModalBuilder
  ).to(LearningWorldCompletionModalBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.IMenuBarBuilder).to(SideBarBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningWorldMenuButtonBuilder).to(
    LearningWorldMenuButtonBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IAvatarCameraBuilder).to(
    AvatarCameraBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IExitModalBuilder).to(
    ExitModalBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningWorldSelectionBuilder).to(
    LearningWorldSelectionBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IAmbienceBuilder).to(
    AmbienceBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IDecorationBuilder).to(
    DecorationBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IStandInDecorationBuilder).to(
    StandInDecorationBuilder
  );
});

export default BuilderDIContainer;
