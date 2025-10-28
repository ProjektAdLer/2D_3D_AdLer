import { LearningSpaceTemplateType } from "../../Types/LearningSpaceTemplateType";
import ILearningSpaceTheme from "../ILearningSpaceTheme";
import {
  SharedCampusLearningElements,
  SharedCampusStoryElement,
  SharedCampusStandinDecorations,
  SharedCampusElevatorDoors,
} from "../SharedThemeElements";

export const LearningSpaceTheme_CampusServerRoom: ILearningSpaceTheme = {
  learningElementModels: SharedCampusLearningElements,
  entryDoorModel: SharedCampusElevatorDoors.entry,
  exitDoorModel: SharedCampusElevatorDoors.exit,
  ambienceModel: require("../../../../../Assets/3dModels/campusTheme/serverroom/env-campus-serverroom.glb"),
  storyElementModel: SharedCampusStoryElement,
  standinDecorationModels: SharedCampusStandinDecorations,
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../../Assets/3dModels/campusTheme/serverroom/d-roomcomp-l-server-in.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../../Assets/3dModels/campusTheme/serverroom/d-roomcomp-r6-server-in.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../../Assets/3dModels/campusTheme/serverroom/d-roomcomp-r8-server-in.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../../Assets/3dModels/campusTheme/serverroom/d-roomcomp-d-server-in.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../../Assets/3dModels/campusTheme/serverroom/d-roomcomp-t-server-in.glb"),
    [LearningSpaceTemplateType.None]: "",
  },
};
