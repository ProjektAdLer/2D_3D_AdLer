import { LearningSpaceTemplateType } from "../../Types/LearningSpaceTemplateType";
import ILearningSpaceTheme from "../ILearningSpaceTheme";
import {
  SharedCampusLearningElements,
  SharedCampusStoryElement,
  SharedCampusStandinDecorations,
  SharedCampusElevatorDoors,
} from "../SharedThemeElements";

export const LearningSpaceTheme_Company_EatingArea: ILearningSpaceTheme = {
  learningElementModels: SharedCampusLearningElements,
  entryDoorModel: SharedCampusElevatorDoors.entry,
  exitDoorModel: SharedCampusElevatorDoors.exit,
  ambienceModel: require("../../../../../Assets/3dModels/Company/EatingArea/env-company-cafeteria.glb"),
  storyElementModel: SharedCampusStoryElement,
  standinDecorationModels: SharedCampusStandinDecorations,
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: "",
    [LearningSpaceTemplateType.R6]: require("../../../../../Assets/3dModels/Company/EatingArea/d-roomcomp-r6-cafeteria-in.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../../Assets/3dModels/Company/EatingArea/d-roomcomp-r8-cafeteria-in.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../../Assets/3dModels/Company/EatingArea/d-roomcomp-d-cafeteria-in.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../../Assets/3dModels/Company/EatingArea/d-roomcomp-t-cafeteria-in.glb"),
    [LearningSpaceTemplateType.None]: "",
  },
};
