import { LearningSpaceTemplateType } from "../../Types/LearningSpaceTemplateType";
import ILearningSpaceTheme from "../ILearningSpaceTheme";
import {
  SharedCampusLearningElements,
  SharedCampusStoryElement,
  SharedCampusStandinDecorations,
  SharedCampusElevatorDoors,
} from "../SharedThemeElements";

export const LearningSpaceTheme_CampusLabor: ILearningSpaceTheme = {
  learningElementModels: SharedCampusLearningElements,
  entryDoorModel: SharedCampusElevatorDoors.entry,
  exitDoorModel: SharedCampusElevatorDoors.exit,
  ambienceModel: require("../../../../../Assets/3dModels/CampusKE/Labor/env-campus-labor.glb"),
  storyElementModel: SharedCampusStoryElement,
  standinDecorationModels: SharedCampusStandinDecorations,
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../../Assets/3dModels/CampusKE/Labor/d-roomcomp-l-labor-in.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../../Assets/3dModels/CampusKE/Labor/d-roomcomp-r6-labor-in.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../../Assets/3dModels/CampusKE/Labor/d-roomcomp-r8-labor-in.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../../Assets/3dModels/CampusKE/Labor/d-roomcomp-d-labor-in.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../../Assets/3dModels/CampusKE/Labor/d-roomcomp-t-labor-in.glb"),
    [LearningSpaceTemplateType.None]: "",
  },
};
