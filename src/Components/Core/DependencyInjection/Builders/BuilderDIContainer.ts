import { ContainerModule } from "inversify";
import AvatarBuilder from "../../Presentation/Babylon/Avatar/AvatarBuilder";
import DoorBuilder from "../../Presentation/Babylon/Door/DoorBuilder";
import LearningElementBuilder from "../../Presentation/Babylon/LearningElements/LearningElementBuilder";
import LearningSpaceBuilder from "../../Presentation/Babylon/LearningSpaces/LearningSpaceBuilder";
import IPresentationBuilder from "../../Presentation/PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../Presentation/PresentationBuilder/IPresentationDirector";
import PresentationDirector from "../../Presentation/PresentationBuilder/PresentationDirector";
import ElementModalBuilder from "../../Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalBuilder";
import LearningWorldScorePanelBuilder from "../../Presentation/React/LearningSpaceDisplay/LearningWorldScorePanel/LearningWorldScorePanelBuilder";
import NotificationManagerBuilder from "../../Presentation/React/GeneralComponents/NotificationManager/NotificationManagerBuilder";
import BUILDER_TYPES from "./BUILDER_TYPES";
import SignInAndOutComponentBuilder from "../../Presentation/React/WelcomePage/SignInAndOutComponent/SignInAndOutComponentBuilder";
import BottomTooltipBuilder from "../../Presentation/React/LearningSpaceDisplay/BottomTooltip/BottomTooltipBuilder";
import SpaceNamePanelBuilder from "../../Presentation/React/LearningSpaceDisplay/LearningSpaceNamePanel/LearningSpaceNamePanelBuilder";
import FullscreenSwitchBuilder from "../../Presentation/React/LearningSpaceDisplay/FullscreenSwitch/FullscreenSwitchBuilder";
import LearningSpaceGoalPanelBuilder from "~ReactComponents/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanelBuilder";
import MenuHeaderBarBuilder from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBarBuilder";
import SpaceSelectionBuilder from "~ReactComponents/LearningSpaceMenu/LearningSpaceSelection/LearningSpaceSelectionBuilder";
import LearningSpaceDetailBuilder from "~ReactComponents/LearningSpaceMenu/LearningSpaceDetail/LearningSpaceDetailBuilder";
import LearningWorldCompletionModalBuilder from "~ReactComponents/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModalBuilder";
import SideBarBuilder from "~ReactComponents/LearningSpaceDisplay/SideBar/SideBarBuilder";
import WelcomePageButtonBuilder from "~ReactComponents/WelcomePage/WelcomePageButton/WelcomePageButtonBuilder";
import AvatarCameraBuilder from "../../Presentation/Babylon/AvatarCamera/AvatarCameraBuilder";
import ExitModalBuilder from "~ReactComponents/LearningSpaceDisplay/ExitModal/ExitModalBuilder";
import LearningWorldSelectionBuilder from "~ReactComponents/LearningWorldMenu/LearningWorldSelection/LearningWorldSelectionBuilder";
import LearningWorldDetailBuilder from "~ReactComponents/LearningWorldMenu/LearningWorldDetail/LearningWorldDetailBuilder";
import AmbienceBuilder from "../../Presentation/Babylon/Ambience/AmbienceBuilder";
import WindowBuilder from "../../Presentation/Babylon/Window/WindowBuilder";
import LearningSpaceScorePanelBuilder from "~ReactComponents/LearningSpaceDisplay/LearningSpaceScorePanel/LearningSpaceScorePanelBuilder";
import DecorationBuilder from "../../Presentation/Babylon/Decoration/DecorationBuilder";
import StandInDecorationBuilder from "../../Presentation/Babylon/StandInDecoration/StandInDecorationBuilder";
import HelpDeskModalBuilder from "~ReactComponents/GeneralComponents/HelpDeskModal/HelpDeskModalBuilder";
import HelpDeskButtonBuilder from "~ReactComponents/GeneralComponents/HelpDeskButton/HelpDeskButtonBuilder";
import AdaptivityElementBuilder from "../../Presentation/Adaptivity/AdaptivityElement/AdaptivityElementBuilder";
import BreakTimeNotificationBuilder from "../../Presentation/Adaptivity/BreakTimeNotification/BreakTimeNotificationBuilder";
import LoadingScreenBuilder from "~ReactComponents/GeneralComponents/LoadingScreen/LoadingScreenBuilder";
import StoryNPCBuilder from "../../Presentation/Babylon/StoryNPC/StoryNPCBuilder";
import StoryElementBuilder from "~ReactComponents/LearningSpaceDisplay/StoryElement/StoryElementBuilder";
import CookieModalBuilder from "~ReactComponents/WelcomePage/CookieModal/CookieModalBuilder";
import ReturnHomeModalBuilder from "~ReactComponents/LearningWorldMenu/ReturnHomeModal/ReturnHomeModalBuilder";
import ControlsExplanationModalBuilder from "~ReactComponents/GeneralComponents/ControlsExplanationModal/ControlsExplanationModalBuilder";
import LMSButtonBuilder from "../../Presentation/React/WelcomePage/LMSButton/LMSButtonBuilder";
import BreakTimeNotificationOverviewBuilder from "~ReactComponents/GeneralComponents/BreakTimeNotificationOverview/BreakTimeNotificationOverviewBuilder";
import AvatarEditorBuilder from "src/Components/Core/Presentation/AvatarEditor/AvatarEditorBuilder";
import AvatarEditorPreviewCameraBuilder from "../../Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewCamera/AvatarEditorPreviewCameraBuilder";
import AvatarEditorPreviewBuilder from "../../Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewBuilder";
import AvatarEditorPreviewModelBuilder from "../../Presentation/AvatarEditor/AvatarEditorPreview/AvatarEditorPreviewModel/AvatarEditorPreviewModelBuilder";
import NarrativeFrameworkBuilder from "~ReactComponents/GeneralComponents/NarrativeFramework/NarrativeFrameworkBuilder";
import NarrativeFrameworkLoadingScreenContainerBuilder from "~ReactComponents/GeneralComponents/NarrativeFrameworkLoadingScreenContainer/NarrativeFrameworkLoadingScreenContainerBuilder";
import NarrativeFrameworkLearningSpaceContainerBuilder from "~ReactComponents/GeneralComponents/NarrativeFrameworkLearningSpaceContainer/NarrativeFrameworkLearningSpaceContainerBuilder";
import NarrativeFrameworkWorldCompletionModalContainerBuilder from "~ReactComponents/GeneralComponents/NarrativeFrameworkWorldCompletionModalContainer/NarrativeFrameworkWorldCompletionModalContainerBuilder";

const BuilderDIContainer = new ContainerModule((bind) => {
  bind<IPresentationDirector>(BUILDER_TYPES.IPresentationDirector).to(
    PresentationDirector,
  );

  bind<IPresentationBuilder>(BUILDER_TYPES.IMoodleButtonBuilder).to(
    LMSButtonBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IHelpDeskButtonBuilder).to(
    HelpDeskButtonBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IHelpDeskModalBuilder).to(
    HelpDeskModalBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILoadingScreenBuilder).to(
    LoadingScreenBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IDoorBuilder).to(DoorBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.IWindowBuilder).to(WindowBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningSpaceScorePanelBuilder).to(
    LearningSpaceScorePanelBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningWorldScorePanelBuilder).to(
    LearningWorldScorePanelBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningElementModalBuilder).to(
    ElementModalBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningSpaceBuilder).to(
    LearningSpaceBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningElementBuilder).to(
    LearningElementBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IAvatarBuilder).to(AvatarBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.IModalManagerBuilder).to(
    NotificationManagerBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ISignInAndOutComponentBuilder).to(
    SignInAndOutComponentBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IBottomTooltipBuilder).to(
    BottomTooltipBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningWorldNamePanelBuilder).to(
    SpaceNamePanelBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IFullscreenSwitchBuilder).to(
    FullscreenSwitchBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningSpaceGoalPanelBuilder).to(
    LearningSpaceGoalPanelBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IHeaderBarBuilder).to(
    MenuHeaderBarBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningSpaceSelectionBuilder).to(
    SpaceSelectionBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningSpaceDetailBuilder).to(
    LearningSpaceDetailBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningWorldDetailBuilder).to(
    LearningWorldDetailBuilder,
  );
  bind<IPresentationBuilder>(
    BUILDER_TYPES.ILearningWorldCompletionModalBuilder,
  ).to(LearningWorldCompletionModalBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.IMenuBarBuilder).to(SideBarBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningWorldMenuButtonBuilder).to(
    WelcomePageButtonBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IAvatarCameraBuilder).to(
    AvatarCameraBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IExitModalBuilder).to(
    ExitModalBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningWorldSelectionBuilder).to(
    LearningWorldSelectionBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IAmbienceBuilder).to(
    AmbienceBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IDecorationBuilder).to(
    DecorationBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IStandInDecorationBuilder).to(
    StandInDecorationBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IAdaptivityElementBuilder).to(
    AdaptivityElementBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IBreakTimeNotificationBuilder).to(
    BreakTimeNotificationBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IStoryElementBuilder).to(
    StoryElementBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IStoryNPCBuilder).to(
    StoryNPCBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ICookieModalBuilder).to(
    CookieModalBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IReturnHomeModalBuilder).to(
    ReturnHomeModalBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IControlsExplanationModalBuilder).to(
    ControlsExplanationModalBuilder,
  );
  bind<IPresentationBuilder>(
    BUILDER_TYPES.IBreakTimeNotificationOverviewBuilder,
  ).to(BreakTimeNotificationOverviewBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.IAvatarEditorBuilder).to(
    AvatarEditorBuilder,
  );
  bind<IPresentationBuilder>(
    BUILDER_TYPES.IAvatarEditorPreviewCameraBuilder,
  ).to(AvatarEditorPreviewCameraBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.IAvatarEditorPreviewBuilder).to(
    AvatarEditorPreviewBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IAvatarEditorPreviewModelBuilder).to(
    AvatarEditorPreviewModelBuilder,
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.INarrativeFrameworkBuilder).to(
    NarrativeFrameworkBuilder,
  );
  bind<IPresentationBuilder>(
    BUILDER_TYPES.INarrativeFrameworkLoadingScreenContainerBuilder,
  ).to(NarrativeFrameworkLoadingScreenContainerBuilder);
  bind<IPresentationBuilder>(
    BUILDER_TYPES.INarrativeFrameworkLearningSpaceContainerBuilder,
  ).to(NarrativeFrameworkLearningSpaceContainerBuilder);
  bind<IPresentationBuilder>(
    BUILDER_TYPES.INarrativeFrameworkWorldCompletionModalContainerBuilder,
  ).to(NarrativeFrameworkWorldCompletionModalContainerBuilder);
});

export default BuilderDIContainer;
