import { LearningSpaceTemplateType } from "../../Types/LearningSpaceTemplateType";
import ILearningSpaceTheme from "../ILearningSpaceTheme";
import {
  SharedCampusLearningElements,
  SharedCampusStoryElement,
  SharedCampusStandinDecorations,
  SharedCampusElevatorDoors,
} from "../SharedThemeElements";

export const LearningSpaceTheme_CampusMensa: ILearningSpaceTheme = {
  learningElementModels: SharedCampusLearningElements,
  entryDoorModel: SharedCampusElevatorDoors.entry,
  exitDoorModel: SharedCampusElevatorDoors.exit,
  ambienceModel: require("../../../../../Assets/3dModels/CampusKE/Mensa/env-campus-mensa.glb"),
  storyElementModel: SharedCampusStoryElement,
  standinDecorationModels: SharedCampusStandinDecorations,
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../../Assets/3dModels/CampusKE/Mensa/d-roomcomp-l-mensa-in.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../../Assets/3dModels/CampusKE/Mensa/d-roomcomp-r6-mensa-in.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../../Assets/3dModels/CampusKE/Mensa/d-roomcomp-r8-mensa-in.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../../Assets/3dModels/CampusKE/Mensa/d-roomcomp-d-mensa-in.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../../Assets/3dModels/CampusKE/Mensa/d-roomcomp-t-mensa-in.glb"),
    [LearningSpaceTemplateType.None]: "",
  },
};
