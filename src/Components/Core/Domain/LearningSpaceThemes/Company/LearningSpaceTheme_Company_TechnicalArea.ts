import { LearningSpaceTemplateType } from "../../Types/LearningSpaceTemplateType";
import ILearningSpaceTheme from "../ILearningSpaceTheme";
import {
  SharedCampusLearningElements,
  SharedCampusStoryElement,
  SharedCampusStandinDecorations,
  SharedCampusElevatorDoors,
} from "../SharedThemeElements";

export const LearningSpaceTheme_Company_TechnicalArea: ILearningSpaceTheme = {
  learningElementModels: SharedCampusLearningElements,
  entryDoorModel: SharedCampusElevatorDoors.entry,
  exitDoorModel: SharedCampusElevatorDoors.exit,
  ambienceModel: require("../../../../../Assets/3dModels/Company/TechnicalArea/env-company-itdepartment.glb"),
  storyElementModel: SharedCampusStoryElement,
  standinDecorationModels: SharedCampusStandinDecorations,
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../../Assets/3dModels/Company/TechnicalArea/d-roomcomp-l-itdepartment-in.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../../Assets/3dModels/Company/TechnicalArea/d-roomcomp-r6-itdepartment-in.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../../Assets/3dModels/Company/TechnicalArea/d-roomcomp-r8-itdepartment-in.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../../Assets/3dModels/Company/TechnicalArea/d-roomcomp-d-itdepartment-in.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../../Assets/3dModels/Company/TechnicalArea/d-roomcomp-t-itdepartment-in.glb"),
    [LearningSpaceTemplateType.None]: "",
  },
};
