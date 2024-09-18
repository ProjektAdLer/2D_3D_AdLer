import { LearningElementModelTypeEnums } from "../LearningElementModels/LearningElementModelTypes";
import { LearningElementTypes } from "../Types/LearningElementTypes";
import { LearningSpaceTemplateType } from "../Types/LearningSpaceTemplateType";
import ILearningSpaceTheme from "./ILearningSpaceTheme";

const LearningSpaceTheme_Arcade: ILearningSpaceTheme = {
  wallTexture: require("../../../../Assets/textures/arcadeTheme/m_wall_bricks_1.jpg"),
  floorTexture: require("../../../../Assets/textures/arcadeTheme/m_floor_bluecarpet_1.jpg"),
  learningElementModels: {
    [LearningElementTypes.h5p]: [
      LearningElementModelTypeEnums.H5pElementModelTypes.GreySlotmachine,
      LearningElementModelTypeEnums.H5pElementModelTypes.RedSlotmachine,
      LearningElementModelTypeEnums.H5pElementModelTypes.PurpleSlotmachine,
      LearningElementModelTypeEnums.H5pElementModelTypes.BlackSlotmachine,
      LearningElementModelTypeEnums.H5pElementModelTypes.DeskPC2,
    ],
    [LearningElementTypes.primitiveH5P]: [
      LearningElementModelTypeEnums.H5pElementModelTypes.GreySlotmachine,
      LearningElementModelTypeEnums.H5pElementModelTypes.RedSlotmachine,
      LearningElementModelTypeEnums.H5pElementModelTypes.PurpleSlotmachine,
      LearningElementModelTypeEnums.H5pElementModelTypes.BlackSlotmachine,
      LearningElementModelTypeEnums.H5pElementModelTypes.DeskPC2,
    ],
    [LearningElementTypes.text]: [
      LearningElementModelTypeEnums.TextElementModelTypes.ComicShelfbig,
    ],
    [LearningElementTypes.image]: [
      LearningElementModelTypeEnums.ImageElementModelTypes.Gameposter1,
      LearningElementModelTypeEnums.ImageElementModelTypes.Gameposter2,
      LearningElementModelTypeEnums.ImageElementModelTypes.CardboardCutout,
    ],
    [LearningElementTypes.video]: [
      LearningElementModelTypeEnums.VideoElementModelTypes.VrDesk,
    ],
    [LearningElementTypes.pdf]: [
      LearningElementModelTypeEnums.TextElementModelTypes.ComicShelfsmall,
    ],
    [LearningElementTypes.adaptivity]: [
      LearningElementModelTypeEnums.QuizElementModelTypes.RobotNPC,
    ],
    [LearningElementTypes.notAnElement]: [],
  },
  standinDecorationModels: [
    require("../../../../Assets/3dModels/arcadeTheme/d_dcomp_baloons_1.glb"),
    require("../../../../Assets/3dModels/arcadeTheme/d_dcomp_armchair_1.glb"),
    require("../../../../Assets/3dModels/arcadeTheme/d_dcomp_bigplant_1.glb"),
  ],
  entryDoorModel: require("../../../../Assets/3dModels/arcadeTheme/3DModel_Door.glb"),
  exitDoorModel: require("../../../../Assets/3dModels/arcadeTheme/3DModel_ExitDoor.glb"),
  windowModel: require("../../../../Assets/3dModels/arcadeTheme/3DModel_Window.glb"),
  ambienceModel: require("../../../../Assets/3dModels/arcadeTheme/env_arcade.glb"),
  storyElementModel:
    LearningElementModelTypeEnums.QuizElementModelTypes.ArcadeNPC,
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../Assets/3dModels/arcadeTheme/d_roomcomp_L_arcade_In.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../Assets/3dModels/arcadeTheme/d_roomcomp_R6_arcade_In.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../Assets/3dModels/arcadeTheme/d_roomcomp_R8_arcade_In.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../Assets/3dModels/arcadeTheme/d_roomcomp_D_arcade_In.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../Assets/3dModels/arcadeTheme/d_roomcomp_T_arcade_In.glb"),
    [LearningSpaceTemplateType.None]: "",
  },
  outsideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../Assets/3dModels/arcadeTheme/d_roomcomp_L_arcade_Out.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../Assets/3dModels/arcadeTheme/d_roomcomp_R6_arcade_Out.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../Assets/3dModels/arcadeTheme/d_roomcomp_R8_arcade_Out.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../Assets/3dModels/arcadeTheme/d_roomcomp_D_arcade_Out.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../Assets/3dModels/arcadeTheme/d_roomcomp_T_arcade_Out.glb"),
    [LearningSpaceTemplateType.None]: "",
  },
};

export default LearningSpaceTheme_Arcade;
