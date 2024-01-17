import { LearningElementModelTypeEnums } from "../LearningElementModels/LearningElementModelTypes";
import { LearningElementTypes } from "../Types/LearningElementTypes";
import { LearningSpaceThemeType } from "../Types/LearningSpaceThemeTypes";
import ILearningSpaceTheme from "./ILearningSpaceTheme";

const LearningSpaceTheme_Suburb: ILearningSpaceTheme = {
  name: LearningSpaceThemeType.Suburb,
  wallTexture: require("../../../../Assets/textures/suburbTheme/m_wall_roughbricks_1.jpg"),
  floorTexture: require("../../../../Assets/textures/suburbTheme/m_floor_woodboards_1.jpg"),
  learningElementModels: {
    [LearningElementTypes.h5p]: [
      LearningElementModelTypeEnums.H5pElementModelTypes.Blackboard,
      LearningElementModelTypeEnums.H5pElementModelTypes.DeskPC1,
      LearningElementModelTypeEnums.H5pElementModelTypes.DrawingTable,
      LearningElementModelTypeEnums.H5pElementModelTypes.SlotMachine,
    ],
    [LearningElementTypes.primitiveH5P]: [
      LearningElementModelTypeEnums.H5pElementModelTypes.Blackboard,
      LearningElementModelTypeEnums.H5pElementModelTypes.DeskPC1,
      LearningElementModelTypeEnums.H5pElementModelTypes.DrawingTable,
      LearningElementModelTypeEnums.H5pElementModelTypes.SlotMachine,
    ],
    [LearningElementTypes.text]: [
      LearningElementModelTypeEnums.TextElementModelTypes.Bookshelf1,
    ],
    [LearningElementTypes.image]: [
      LearningElementModelTypeEnums.ImageElementModelTypes.Painting1,
      LearningElementModelTypeEnums.ImageElementModelTypes.Painting2,
      LearningElementModelTypeEnums.ImageElementModelTypes.PaintingEasel,
    ],
    [LearningElementTypes.video]: [
      LearningElementModelTypeEnums.VideoElementModelTypes.Television,
    ],
    [LearningElementTypes.pdf]: [
      LearningElementModelTypeEnums.TextElementModelTypes.Bookshelf2,
    ],
    [LearningElementTypes.adaptivity]: [
      LearningElementModelTypeEnums.QuizElementModelTypes.RobotNPC,
    ],
    [LearningElementTypes.notAnElement]: [],
  },
  standinDecorationModels: [
    require("../../../../Assets/3dModels/suburbTheme/d_dcomp_dinnertable_1.glb"),
    require("../../../../Assets/3dModels/suburbTheme/d_dcomp_desk_1.glb"),
    require("../../../../Assets/3dModels/suburbTheme/d_dcomp_sideboardbookshelf_1.glb"),
  ],
  entryDoorModel: require("../../../../Assets/3dModels/suburbTheme/3DModel_Door.glb"),
  exitDoorModel: require("../../../../Assets/3dModels/suburbTheme/3DModel_ExitDoor.glb"),
  windowModel: require("../../../../Assets/3dModels/suburbTheme/3DModel_Window.glb"),
  ambienceModel: require("../../../../Assets/3dModels/suburbTheme/env_suburb.glb"),
};

export default LearningSpaceTheme_Suburb;
