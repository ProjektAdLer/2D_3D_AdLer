import { LearningSpaceTemplateType } from "../../Types/LearningSpaceTemplateType";
import ILearningSpaceTheme from "../ILearningSpaceTheme";
import {
  SharedCampusLearningElements,
  SharedCampusStoryElement,
  SharedCampusStandinDecorations,
  SharedCampusElevatorDoors,
} from "../SharedThemeElements";

export const LearningSpaceTheme_Company_Presentation: ILearningSpaceTheme = {
  learningElementModels: SharedCampusLearningElements,
  entryDoorModel: SharedCampusElevatorDoors.entry,
  exitDoorModel: SharedCampusElevatorDoors.exit,
  ambienceModel: require("../../../../../Assets/3dModels/Company/Presentation/env-company-conferenceroom.glb"),
  storyElementModel: SharedCampusStoryElement,
  standinDecorationModels: SharedCampusStandinDecorations,
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../../Assets/3dModels/Company/Presentation/d-roomcomp-l-conferenceroom-in.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../../Assets/3dModels/Company/Presentation/d-roomcomp-r6-conferenceroom-in.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../../Assets/3dModels/Company/Presentation/d-roomcomp-r8-conferenceroom-in.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../../Assets/3dModels/Company/Presentation/d-roomcomp-d-conferenceroom-in.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../../Assets/3dModels/Company/Presentation/d-roomcomp-t-conferenceroom-in.glb"),
    [LearningSpaceTemplateType.None]: "",
  },
};
