import { ContainerModule } from "inversify";
import AvatarBuilder from "../../Presentation/Babylon/Avatar/AvatarBuilder";
import DoorBuilder from "../../Presentation/Babylon/Door/DoorBuilder";
import LearningElementBuilder from "../../Presentation/Babylon/LearningElement/LearningElementBuilder";
import LearningRoomBuilder from "../../Presentation/Babylon/LearningRoom/LearningRoomBuilder";
import IPresentationBuilder from "../../Presentation/PresentationBuilder/IPresentationBuilder";
import IPresentationDirector from "../../Presentation/PresentationBuilder/IPresentationDirector";
import PresentationDirector from "../../Presentation/PresentationBuilder/PresentationDirector";
import LearningElementModalBuilder from "../../Presentation/React/LearningElementModal/LearningElementModalBuilder";
import MoodleLoginFormBuilder from "../../Presentation/React/MoodleLoginForm/MoodleLoginFormBuilder";
import ScorePanelBuilder from "../../Presentation/React/ScorePanel/ScorePanelBuilder";
import BUILDER_TYPES from "./BUILDER_TYPES";

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
});

export default BuilderDIContainer;
