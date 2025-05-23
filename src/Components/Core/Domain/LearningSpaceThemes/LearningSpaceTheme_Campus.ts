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
      LearningElementModelTypeEnums.QuizElementModelTypes.AleRobotNPC,
    ],
    [LearningElementTypes.notAnElement]: [],
  },
  standinDecorationModels: [
    require("../../../../Assets/3dModels/campusTheme/d-dcomp-schooldesk-1.glb"),
    require("../../../../Assets/3dModels/campusTheme/d-dcomp-watertower-1.glb"),
    require("../../../../Assets/3dModels/campusTheme/d-dcomp-vendingmachine-1.glb"),
  ],
  entryDoorModel: require("../../../../Assets/3dModels/campusTheme/d-door-campus-entry.glb"),
  exitDoorModel: require("../../../../Assets/3dModels/campusTheme/d-door-campus-exit.glb"),
  windowModel: require("../../../../Assets/3dModels/campusTheme/d-door-campus-window.glb"),
  ambienceModel: require("../../../../Assets/3dModels/campusTheme/env-campus-ab.glb"),
  storyElementModel:
    LearningElementModelTypeEnums.QuizElementModelTypes.DefaultCampusNPC,
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../Assets/3dModels/campusTheme/d-roomcomp-l-campus-in.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../Assets/3dModels/campusTheme/d-roomcomp-r6-campus-in.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../Assets/3dModels/campusTheme/d-roomcomp-r8-campus-in.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../Assets/3dModels/campusTheme/d-roomcomp-d-campus-in.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../Assets/3dModels/campusTheme/d-roomcomp-t-campus-in.glb"),
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
  ambienceModel: require("../../../../Assets/3dModels/campusTheme/env-campus-ke.glb"),
  storyElementModel: LearningSpaceTheme_CampusAB.storyElementModel,
  insideDecorationModels: LearningSpaceTheme_CampusAB.insideDecorationModels,
  outsideDecorationModels: LearningSpaceTheme_CampusAB.outsideDecorationModels,
};

export const LearningSpaceTheme_CampusLibrary: ILearningSpaceTheme = {
  learningElementModels: LearningSpaceTheme_CampusAB.learningElementModels,
  entryDoorModel: require("../../../../Assets/3dModels/sharedModels/id-elevator-entry.glb"),
  exitDoorModel: require("../../../../Assets/3dModels/sharedModels/id-elevator-exit.glb"),
  ambienceModel: require("../../../../Assets/3dModels/campusTheme/library/env-campus-library.glb"),
  storyElementModel: LearningSpaceTheme_CampusAB.storyElementModel,
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../Assets/3dModels/campusTheme/library/d-roomcomp-l-library-in.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../Assets/3dModels/campusTheme/library/d-roomcomp-r6-library-in.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../Assets/3dModels/campusTheme/library/d-roomcomp-r8-library-in.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../Assets/3dModels/campusTheme/library/d-roomcomp-d-library-in.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../Assets/3dModels/campusTheme/library/d-roomcomp-t-library-in.glb"),
    [LearningSpaceTemplateType.None]: "",
  },
};

export const LearningSpaceTheme_CampusMensa: ILearningSpaceTheme = {
  learningElementModels: LearningSpaceTheme_CampusAB.learningElementModels,
  entryDoorModel: require("../../../../Assets/3dModels/sharedModels/id-elevator-entry.glb"),
  exitDoorModel: require("../../../../Assets/3dModels/sharedModels/id-elevator-exit.glb"),
  ambienceModel: require("../../../../Assets/3dModels/campusTheme/mensa/env-campus-mensa.glb"),
  storyElementModel: LearningSpaceTheme_CampusAB.storyElementModel,
  standinDecorationModels: [
    require("../../../../Assets/3dModels/campusTheme/d-dcomp-schooldesk-1.glb"),
    require("../../../../Assets/3dModels/campusTheme/d-dcomp-watertower-1.glb"),
  ],
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../Assets/3dModels/campusTheme/mensa/d-roomcomp-l-mensa-in.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../Assets/3dModels/campusTheme/mensa/d-roomcomp-r6-mensa-in.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../Assets/3dModels/campusTheme/mensa/d-roomcomp-r8-mensa-in.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../Assets/3dModels/campusTheme/mensa/d-roomcomp-d-mensa-in.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../Assets/3dModels/campusTheme/mensa/d-roomcomp-t-mensa-in.glb"),
    [LearningSpaceTemplateType.None]: "",
  },
};

export const LearningSpaceTheme_CampusStudentClub: ILearningSpaceTheme = {
  learningElementModels: LearningSpaceTheme_CampusAB.learningElementModels,
  entryDoorModel: require("../../../../Assets/3dModels/sharedModels/id-elevator-entry.glb"),
  exitDoorModel: require("../../../../Assets/3dModels/sharedModels/id-elevator-exit.glb"),
  ambienceModel: require("../../../../Assets/3dModels/campusTheme/studentClub/env-campus-studentClub.glb"),
  storyElementModel: LearningSpaceTheme_CampusAB.storyElementModel,
  standinDecorationModels: [
    require("../../../../Assets/3dModels/campusTheme/d-dcomp-schooldesk-1.glb"),
    require("../../../../Assets/3dModels/campusTheme/d-dcomp-watertower-1.glb"),
  ],
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: "",
    [LearningSpaceTemplateType.R6]: "",
    [LearningSpaceTemplateType.R8]: "",
    [LearningSpaceTemplateType.D]: "",
    [LearningSpaceTemplateType.T]: "",
    [LearningSpaceTemplateType.None]: "",
  },
};

export const LearningSpaceTheme_CampusServerRoom: ILearningSpaceTheme = {
  learningElementModels: LearningSpaceTheme_CampusAB.learningElementModels,
  entryDoorModel: require("../../../../Assets/3dModels/sharedModels/id-elevator-entry.glb"),
  exitDoorModel: require("../../../../Assets/3dModels/sharedModels/id-elevator-exit.glb"),
  ambienceModel: require("../../../../Assets/3dModels/campusTheme/serverroom/env-campus-serverroom.glb"),
  storyElementModel: LearningSpaceTheme_CampusAB.storyElementModel,
  standinDecorationModels: [
    require("../../../../Assets/3dModels/campusTheme/d-dcomp-schooldesk-1.glb"),
    require("../../../../Assets/3dModels/campusTheme/d-dcomp-watertower-1.glb"),
  ],
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../Assets/3dModels/campusTheme/serverroom/d-roomcomp-l-server-in.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../Assets/3dModels/campusTheme/serverroom/d-roomcomp-r6-server-in.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../Assets/3dModels/campusTheme/serverroom/d-roomcomp-r8-server-in.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../Assets/3dModels/campusTheme/serverroom/d-roomcomp-d-server-in.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../Assets/3dModels/campusTheme/serverroom/d-roomcomp-t-server-in.glb"),
    [LearningSpaceTemplateType.None]: "",
  },
};

export const LearningSpaceTheme_CampusLabor: ILearningSpaceTheme = {
  learningElementModels: LearningSpaceTheme_CampusAB.learningElementModels,
  entryDoorModel: require("../../../../Assets/3dModels/sharedModels/id-elevator-entry.glb"),
  exitDoorModel: require("../../../../Assets/3dModels/sharedModels/id-elevator-exit.glb"),
  ambienceModel: require("../../../../Assets/3dModels/campusTheme/labor/env-campus-labor.glb"),
  storyElementModel: LearningSpaceTheme_CampusAB.storyElementModel,
  standinDecorationModels: [
    require("../../../../Assets/3dModels/campusTheme/d-dcomp-schooldesk-1.glb"),
    require("../../../../Assets/3dModels/campusTheme/d-dcomp-watertower-1.glb"),
  ],
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../Assets/3dModels/campusTheme/labor/d-roomcomp-l-labor-in.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../Assets/3dModels/campusTheme/labor/d-roomcomp-r6-labor-in.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../Assets/3dModels/campusTheme/labor/d-roomcomp-r8-labor-in.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../Assets/3dModels/campusTheme/labor/d-roomcomp-d-labor-in.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../Assets/3dModels/campusTheme/labor/d-roomcomp-t-labor-in.glb"),
    [LearningSpaceTemplateType.None]: "",
  },
};

export const LearningSpaceTheme_CampusAuditorium: ILearningSpaceTheme = {
  learningElementModels: LearningSpaceTheme_CampusAB.learningElementModels,
  entryDoorModel: require("../../../../Assets/3dModels/sharedModels/id-elevator-entry.glb"),
  exitDoorModel: require("../../../../Assets/3dModels/sharedModels/id-elevator-exit.glb"),
  ambienceModel: require("../../../../Assets/3dModels/campusTheme/auditorium/env-campus-auditorium.glb"),
  storyElementModel: LearningSpaceTheme_CampusAB.storyElementModel,
  standinDecorationModels: [
    require("../../../../Assets/3dModels/campusTheme/d-dcomp-schooldesk-1.glb"),
    require("../../../../Assets/3dModels/campusTheme/d-dcomp-watertower-1.glb"),
  ],
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: "",
    [LearningSpaceTemplateType.R6]: "",
    [LearningSpaceTemplateType.R8]: "",
    [LearningSpaceTemplateType.D]: "",
    [LearningSpaceTemplateType.T]: "",
    [LearningSpaceTemplateType.None]: "",
  },
};
