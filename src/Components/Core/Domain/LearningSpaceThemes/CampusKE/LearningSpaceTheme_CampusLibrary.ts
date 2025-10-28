import { LearningSpaceTemplateType } from "../../Types/LearningSpaceTemplateType";
import ILearningSpaceTheme from "../ILearningSpaceTheme";
import {
  SharedCampusLearningElements,
  SharedCampusStoryElement,
  SharedCampusElevatorDoors,
} from "../SharedThemeElements";

export const LearningSpaceTheme_CampusLibrary: ILearningSpaceTheme = {
  learningElementModels: SharedCampusLearningElements,
  entryDoorModel: SharedCampusElevatorDoors.entry,
  exitDoorModel: SharedCampusElevatorDoors.exit,
  ambienceModel: require("../../../../../Assets/3dModels/CampusKE/Library/env-campus-library.glb"),
  storyElementModel: SharedCampusStoryElement,
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../../Assets/3dModels/CampusKE/Library/d-roomcomp-l-library-in.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../../Assets/3dModels/CampusKE/Library/d-roomcomp-r6-library-in.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../../Assets/3dModels/CampusKE/Library/d-roomcomp-r8-library-in.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../../Assets/3dModels/CampusKE/Library/d-roomcomp-d-library-in.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../../Assets/3dModels/CampusKE/Library/d-roomcomp-t-library-in.glb"),
    [LearningSpaceTemplateType.None]: "",
  },
};
