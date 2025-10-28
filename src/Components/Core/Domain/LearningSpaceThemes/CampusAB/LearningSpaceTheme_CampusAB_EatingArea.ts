import { LearningSpaceTemplateType } from "../../Types/LearningSpaceTemplateType";
import ILearningSpaceTheme from "../ILearningSpaceTheme";
import {
  SharedCampusLearningElements,
  SharedCampusStoryElement,
  SharedCampusStandinDecorations,
  SharedCampusElevatorDoors,
} from "../SharedThemeElements";

export const LearningSpaceTheme_CampusAB_EatingArea: ILearningSpaceTheme = {
  learningElementModels: SharedCampusLearningElements,
  entryDoorModel: SharedCampusElevatorDoors.entry,
  exitDoorModel: SharedCampusElevatorDoors.exit,
  ambienceModel: require("../../../../../Assets/3dModels/CampusAB/EatingArea/env-campus-ab-mensa.glb"),
  storyElementModel: SharedCampusStoryElement,
  standinDecorationModels: SharedCampusStandinDecorations,
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../../Assets/3dModels/CampusAB/EatingArea/d-roomcomp-l-mensa-in.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../../Assets/3dModels/CampusAB/EatingArea/d-roomcomp-r6-mensa-in.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../../Assets/3dModels/CampusAB/EatingArea/d-roomcomp-r8-mensa-in.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../../Assets/3dModels/CampusAB/EatingArea/d-roomcomp-d-mensa-in.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../../Assets/3dModels/CampusAB/EatingArea/d-roomcomp-t-mensa-in.glb"),
    [LearningSpaceTemplateType.None]: "",
  },
};
