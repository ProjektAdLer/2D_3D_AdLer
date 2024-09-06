import { LearningElementModelTypeEnums } from "../LearningElementModels/LearningElementModelTypes";
import { LearningElementTypes } from "../Types/LearningElementTypes";
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
  decorationModelLinkLShape: require("../../../../Assets/3dModels/arcadeTheme/dLShape Sampleroom - Deko.glb"),
  decorationModelLink2x2: require("../../../../Assets/3dModels/arcadeTheme/d2x2Shape Sampleroom - Deko.glb"),
  decorationModelLink2x3: require("../../../../Assets/3dModels/arcadeTheme/d2x3Shape Sampleroom - Deko.glb"),
  decorationModelLinkTShape: require("../../../../Assets/3dModels/arcadeTheme/dTShape Sampleroom - Deko.glb"),
  decorationModelLinkDShape: require("../../../../Assets/3dModels/arcadeTheme/dDShape Sampleroom - Deko.glb"),
};

export default LearningSpaceTheme_Arcade;
