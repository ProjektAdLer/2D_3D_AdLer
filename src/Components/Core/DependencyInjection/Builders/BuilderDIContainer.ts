import { ContainerModule } from "inversify";
import AvatarBuilder from "../../Presentation/Babylon/Avatar/AvatarBuilder";
import DoorBuilder from "../../Presentation/Babylon/Door/DoorBuilder";
import LearningElementBuilder from "../../Presentation/Babylon/LearningElement/LearningElementBuilder";
import LearningRoomBuilder from "../../Presentation/Babylon/LearningRoom/LearningRoomBuilder";
import IPresentationBuilder from "../../Presentation/PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../Presentation/PresentationBuilder/IPresentationDirector";
import PresentationDirector from "../../Presentation/PresentationBuilder/PresentationDirector";
import LearningElementModalBuilder from "../../Presentation/React/LearningRoomDisplay/LearningElementModal/LearningElementModalBuilder";
import LearningElementsDropdownBuilder from "../../Presentation/React/LearningRoomDisplay/LearningElementsDropdown/LearningElementsDropdownBuilder";
import MoodleLoginFormBuilder from "../../Presentation/React/MoodleLoginForm/MoodleLoginFormBuilder";
import ScorePanelBuilder from "../../Presentation/React/LearningRoomDisplay/ScorePanel/ScorePanelBuilder";
import ModalManagerBuilder from "../../Presentation/React/LearningRoomDisplay/ModalManager/ModalManagerBuilder";
import BUILDER_TYPES from "./BUILDER_TYPES";
import MoodleLoginButtonBuilder from "../../Presentation/React/MoodleLoginButton/MoodleLoginButtonBuilder";
import BottomTooltipBuilder from "../../Presentation/React/LearningRoomDisplay/BottomTooltip/BottomTooltipBuilder";
import DebugPanelBuilder from "../../Presentation/React/LearningRoomDisplay/DebugPanel/DebugPanelBuilder";
import LearningWorldNamePanelBuilder from "../../Presentation/React/LearningRoomDisplay/LearningWorldNamePanel/LearningWorldNamePanelBuilder";
import LoadLearningWorldButtonBuilder from "../../Presentation/React/LearningRoomDisplay/LoadLearningWorldButton/LoadLearningWorldButtonBuilder";
import FullscreenSwitchBuilder from "../../Presentation/React/LearningRoomDisplay/FullscreenSwitch/FullscreenSwitchBuilder";
import LearningWorldGoalPanelBuilder from "~ReactComponents/LearningRoomDisplay/LearningWorldGoalPanel/LearningWorldGoalPanelBuilder";
import HeaderBarBuilder from "~ReactComponents/LearningRoomMenu/HeaderBar/HeaderBarBuilder";
import LearningRoomSelectionBuilder from "~ReactComponents/LearningRoomMenu/LearningRoomSelection/LearningRoomSelectionBuilder";

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
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningElementModalBuilder).to(
    LearningElementModalBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningRoomBuilder).to(
    LearningRoomBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningElementBuilder).to(
    LearningElementBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IAvatarBuilder).to(AvatarBuilder);
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningElementsDropdownBuilder).to(
    LearningElementsDropdownBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IModalManagerBuilder).to(
    ModalManagerBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IMoodleLoginButtonBuilder).to(
    MoodleLoginButtonBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IBottomTooltipBuilder).to(
    BottomTooltipBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IDebugPanelBuilder).to(
    DebugPanelBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningWorldNamePanelBuilder).to(
    LearningWorldNamePanelBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILoadLearningWorldButtonBuilder).to(
    LoadLearningWorldButtonBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IFullscreenSwitchBuilder).to(
    FullscreenSwitchBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningWorldGoalPanelBuilder).to(
    LearningWorldGoalPanelBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IHeaderBarBuilder).to(
    HeaderBarBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILearningRoomSelectionBuilder).to(
    LearningRoomSelectionBuilder
  );
});

export default BuilderDIContainer;
