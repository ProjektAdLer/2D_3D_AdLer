import { LearningElementModelTypeEnums } from "../LearningElementModels/LearningElementModelTypes";
import { LearningElementTypes } from "../Types/LearningElementTypes";
import { LearningSpaceTemplateType } from "../Types/LearningSpaceTemplateType";
import ILearningSpaceTheme from "./ILearningSpaceTheme";

export const LearningSpaceTheme_CampusAB: ILearningSpaceTheme = {
  wallTexture: require("../../../../Assets/textures/campusTheme/m_wall_woodtiles_1.jpg"),
  floorTexture: require("../../../../Assets/textures/campusTheme/m_floor_bluecarpet2_1.jpg"),
  learningElementModels: {
    [LearningElementTypes.h5p]: [
      LearningElementModelTypeEnums.H5pElementModelTypes.Blackboard2,
      LearningElementModelTypeEnums.H5pElementModelTypes.DeskPC3,
      LearningElementModelTypeEnums.H5pElementModelTypes.DrawingTable2,
      LearningElementModelTypeEnums.H5pElementModelTypes.DaylightProjector,
    ],
    [LearningElementTypes.primitiveH5P]: [
      LearningElementModelTypeEnums.H5pElementModelTypes.Blackboard2,
      LearningElementModelTypeEnums.H5pElementModelTypes.DeskPC3,
      LearningElementModelTypeEnums.H5pElementModelTypes.DrawingTable2,
      LearningElementModelTypeEnums.H5pElementModelTypes.DaylightProjector,
    ],
    [LearningElementTypes.text]: [
      LearningElementModelTypeEnums.TextElementModelTypes.LibraryShelf,
    ],
    [LearningElementTypes.image]: [
      LearningElementModelTypeEnums.ImageElementModelTypes.ScienceGeo1,
      LearningElementModelTypeEnums.ImageElementModelTypes.ScienceBio1,
      LearningElementModelTypeEnums.ImageElementModelTypes.ScienceWhiteboard,
    ],
    [LearningElementTypes.video]: [
      LearningElementModelTypeEnums.VideoElementModelTypes.MovieProjector,
    ],
    [LearningElementTypes.pdf]: [
      LearningElementModelTypeEnums.TextElementModelTypes.Bookshelf1,
    ],
    [LearningElementTypes.adaptivity]: [
      LearningElementModelTypeEnums.QuizElementModelTypes.RobotNPC,
    ],
    [LearningElementTypes.notAnElement]: [],
  },
  standinDecorationModels: [
    require("../../../../Assets/3dModels/campusTheme/d_dcomp_schooldesk_1.glb"),
    require("../../../../Assets/3dModels/campusTheme/d_dcomp_watertower_1.glb"),
    require("../../../../Assets/3dModels/campusTheme/d_dcomp_vendingmachine_1.glb"),
  ],
  entryDoorModel: require("../../../../Assets/3dModels/campusTheme/3DModel_Door.glb"),
  exitDoorModel: require("../../../../Assets/3dModels/campusTheme/3DModel_ExitDoor.glb"),
  windowModel: require("../../../../Assets/3dModels/campusTheme/3DModel_Window.glb"),
  ambienceModel: require("../../../../Assets/3dModels/campusTheme/env_campus_ab.glb"),
  storyElementModel:
    LearningElementModelTypeEnums.QuizElementModelTypes.DefaultNPC,
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../Assets/3dModels/campusTheme/d_roomcomp_L_campus_In.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../Assets/3dModels/campusTheme/d_roomcomp_R6_campus_In.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../Assets/3dModels/campusTheme/d_roomcomp_R8_campus_In.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../Assets/3dModels/campusTheme/d_roomcomp_D_campus_In.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../Assets/3dModels/campusTheme/d_roomcomp_T_campus_In.glb"),
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

export const LearningSpaceTheme_CampusKE: ILearningSpaceTheme = {
  wallTexture: LearningSpaceTheme_CampusAB.wallTexture,
  floorTexture: LearningSpaceTheme_CampusAB.floorTexture,
  learningElementModels: LearningSpaceTheme_CampusAB.learningElementModels,
  standinDecorationModels: LearningSpaceTheme_CampusAB.standinDecorationModels,
  entryDoorModel: LearningSpaceTheme_CampusAB.entryDoorModel,
  exitDoorModel: LearningSpaceTheme_CampusAB.exitDoorModel,
  windowModel: LearningSpaceTheme_CampusAB.windowModel,
  ambienceModel: require("../../../../Assets/3dModels/campusTheme/env_campus_ke.glb"),
  storyElementModel: LearningSpaceTheme_CampusAB.storyElementModel,
  insideDecorationModels: LearningSpaceTheme_CampusAB.insideDecorationModels,
  outsideDecorationModels: LearningSpaceTheme_CampusAB.outsideDecorationModels,
};
