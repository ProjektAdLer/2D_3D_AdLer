import { LearningSpaceTemplateType } from "../../Types/LearningSpaceTemplateType";
import ILearningSpaceTheme from "../ILearningSpaceTheme";
import {
  SharedCampusLearningElements,
  SharedCampusStoryElement,
} from "../SharedThemeElements";

export const LearningSpaceTheme_CampusAB: ILearningSpaceTheme = {
  wallTexture: require("../../../../../Assets/textures/campusTheme/m_wall_woodtiles_1.jpg"),
  floorTexture: require("../../../../../Assets/textures/campusTheme/m_floor_bluecarpet2_1.jpg"),
  learningElementModels: SharedCampusLearningElements,
  standinDecorationModels: [
    require("../../../../../Assets/3dModels/sharedModels/campusTheme/d-dcomp-schooldesk-1.glb"),
    require("../../../../../Assets/3dModels/sharedModels/campusTheme/d-dcomp-watertower-1.glb"),
    require("../../../../../Assets/3dModels/sharedModels/campusTheme/d-dcomp-vendingmachine-1.glb"),
  ],
  entryDoorModel: require("../../../../../Assets/3dModels/sharedModels/campusTheme/d-door-campus-entry.glb"),
  exitDoorModel: require("../../../../../Assets/3dModels/sharedModels/campusTheme/d-door-campus-exit.glb"),
  windowModel: require("../../../../../Assets/3dModels/sharedModels/campusTheme/d-door-campus-window.glb"),
  ambienceModel: require("../../../../../Assets/3dModels/CampusAB/Main/env-campus-ab.glb"),
  storyElementModel: SharedCampusStoryElement,
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../../Assets/3dModels/sharedModels/campusTheme/d-roomcomp-l-campus-in.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../../Assets/3dModels/sharedModels/campusTheme/d-roomcomp-r6-campus-in.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../../Assets/3dModels/sharedModels/campusTheme/d-roomcomp-r8-campus-in.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../../Assets/3dModels/sharedModels/campusTheme/d-roomcomp-d-campus-in.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../../Assets/3dModels/sharedModels/campusTheme/d-roomcomp-t-campus-in.glb"),
    [LearningSpaceTemplateType.None]: "",
  },
  outsideDecorationModels: {
    [LearningSpaceTemplateType.L]: "",
    [LearningSpaceTemplateType.R6]: "",
    [LearningSpaceTemplateType.R8]: "",
    [LearningSpaceTemplateType.D]: "",
    [LearningSpaceTemplateType.T]: "",
    [LearningSpaceTemplateType.None]: "",
  },
};
