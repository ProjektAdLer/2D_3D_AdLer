import { LearningElementModelTypeEnums } from "../LearningElementModels/LearningElementModelTypes";
import { LearningElementTypes } from "../Types/LearningElementTypes";
import { LearningSpaceThemeType } from "../Types/LearningSpaceThemeTypes";
import ILearningSpaceTheme from "./ILearningSpaceTheme";

const LearningSpaceTheme_Campus: ILearningSpaceTheme = {
  name: LearningSpaceThemeType.Campus,
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
  ambienceModel: require("../../../../Assets/3dModels/campusTheme/env_campus.glb"),
  storyElementModel:
    LearningElementModelTypeEnums.QuizElementModelTypes.DefaultNPC,
};

export default LearningSpaceTheme_Campus;
