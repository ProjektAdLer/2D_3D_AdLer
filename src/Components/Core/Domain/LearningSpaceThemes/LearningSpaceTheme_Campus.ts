import { LearningElementModelTypeEnums } from "../LearningElementModels/LearningElementModelTypes";
import { LearningElementTypes } from "../Types/LearningElementTypes";
import ILearningSpaceTheme from "./ILearningSpaceTheme";

export const LearningSpaceTheme_CampusAB: ILearningSpaceTheme = {
  wallTexture: require("../../../../Assets/textures/campusTheme/m_wall_woodtiles_1.jpg"),
  floorTexture: require("../../../../Assets/textures/campusTheme/m_floor_bluecarpet2_1.jpg"),
  learningElementModels: {
    [LearningElementTypes.h5p]: [
      LearningElementModelTypeEnums.H5pElementModelTypes.Blackboard2,
      LearningElementModelTypeEnums.H5pElementModelTypes.DeskPC3,
      LearningElementModelTypeEnums.H5pElementModelTypes.DrawingTable2,
      LearningElementModelTypeEnums.H5pElementModelTypes.Daylightprojector,
    ],
    [LearningElementTypes.primitiveH5P]: [
      LearningElementModelTypeEnums.H5pElementModelTypes.Blackboard2,
      LearningElementModelTypeEnums.H5pElementModelTypes.DeskPC3,
      LearningElementModelTypeEnums.H5pElementModelTypes.DrawingTable2,
      LearningElementModelTypeEnums.H5pElementModelTypes.Daylightprojector,
    ],
    [LearningElementTypes.text]: [
      LearningElementModelTypeEnums.TextElementModelTypes.LibraryShelf,
    ],
    [LearningElementTypes.image]: [
      LearningElementModelTypeEnums.ImageElementModelTypes.sciencegeo1,
      LearningElementModelTypeEnums.ImageElementModelTypes.sciencebio1,
      LearningElementModelTypeEnums.ImageElementModelTypes.sciencewhiteboard,
    ],
    [LearningElementTypes.video]: [
      LearningElementModelTypeEnums.VideoElementModelTypes.movieprojector,
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
  decorationModelLinkLShape: require("../../../../Assets/3dModels/campusTheme/dLShape Sampleroom - Deko.glb"),
  decorationModelLink2x2: require("../../../../Assets/3dModels/campusTheme/d2x2Shape Sampleroom - Deko.glb"),
  decorationModelLink2x3: require("../../../../Assets/3dModels/campusTheme/d2x3Shape Sampleroom - Deko.glb"),
  decorationModelLinkTShape: require("../../../../Assets/3dModels/campusTheme/dTShape Sampleroom - Deko.glb"),
  decorationModelLinkDShape: require("../../../../Assets/3dModels/campusTheme/dDShape Sampleroom - Deko.glb"),
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
  decorationModelLinkLShape:
    LearningSpaceTheme_CampusAB.decorationModelLinkLShape,
  decorationModelLink2x2: LearningSpaceTheme_CampusAB.decorationModelLink2x2,
  decorationModelLink2x3: LearningSpaceTheme_CampusAB.decorationModelLink2x3,
  decorationModelLinkTShape:
    LearningSpaceTheme_CampusAB.decorationModelLinkTShape,
  decorationModelLinkDShape:
    LearningSpaceTheme_CampusAB.decorationModelLinkDShape,
};
