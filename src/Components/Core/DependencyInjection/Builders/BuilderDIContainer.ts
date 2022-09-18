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
import MoodleLoginFormBuilder from "../../Presentation/React/MoodleLoginForm/MoodleLoginFormBuilder";
import ScorePanelBuilder from "../../Presentation/React/SpaceDisplay/ScorePanel/ScorePanelBuilder";
import ModalManagerBuilder from "../../Presentation/React/SpaceDisplay/ModalManager/ModalManagerBuilder";
import BUILDER_TYPES from "./BUILDER_TYPES";
import MoodleLoginButtonBuilder from "../../Presentation/React/MoodleLoginButton/MoodleLoginButtonBuilder";
import BottomTooltipBuilder from "../../Presentation/React/SpaceDisplay/BottomTooltip/BottomTooltipBuilder";
import DebugPanelBuilder from "../../Presentation/React/SpaceDisplay/DebugPanel/DebugPanelBuilder";
import WorldNamePanelBuilder from "../../Presentation/React/SpaceDisplay/WorldNamePanel/WorldNamePanelBuilder";
import LoadSpaceButtonBuilder from "../../Presentation/React/SpaceDisplay/LoadSpaceButton/LoadSpaceButtonBuilder";
import FullscreenSwitchBuilder from "../../Presentation/React/SpaceDisplay/FullscreenSwitch/FullscreenSwitchBuilder";
import WorldGoalPanelBuilder from "~ReactComponents/SpaceDisplay/WorldGoalPanel/WorldGoalPanelBuilder";
import HeaderBarBuilder from "~ReactComponents/SpaceMenu/HeaderBar/HeaderBarBuilder";
import SpaceSelectionBuilder from "~ReactComponents/SpaceMenu/SpaceSelection/SpaceSelectionBuilder";
import DetailSectionBuilder from "~ReactComponents/SpaceMenu/DetailSection/DetailSectionBuilder";

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
  bind<IPresentationBuilder>(BUILDER_TYPES.IWorldNamePanelBuilder).to(
    WorldNamePanelBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.ILoadSpaceButtonBuilder).to(
    LoadSpaceButtonBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IFullscreenSwitchBuilder).to(
    FullscreenSwitchBuilder
  );
  bind<IPresentationBuilder>(BUILDER_TYPES.IWorldGoalPanelBuilder).to(
    WorldGoalPanelBuilder
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
});

export default BuilderDIContainer;
