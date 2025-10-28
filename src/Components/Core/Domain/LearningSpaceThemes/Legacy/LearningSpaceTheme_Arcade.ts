import { LearningElementModelTypeEnums } from "../../LearningElementModels/LearningElementModelTypes";
import { LearningElementTypes } from "../../Types/LearningElementTypes";
import { LearningSpaceTemplateType } from "../../Types/LearningSpaceTemplateType";
import ILearningSpaceTheme from "../ILearningSpaceTheme";

const LearningSpaceTheme_Arcade: ILearningSpaceTheme = {
  wallTexture: require("../../../../../Assets/textures/arcadeTheme/m_wall_bricks_1.jpg"),
  floorTexture: require("../../../../../Assets/textures/arcadeTheme/m_floor_bluecarpet_1.jpg"),
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
      LearningElementModelTypeEnums.QuizElementModelTypes.AleRobotNPC,
    ],
    [LearningElementTypes.notAnElement]: [],
  },
  standinDecorationModels: [
    require("../../../../../Assets/3dModels/arcadeTheme/d-dcomp-baloons-1.glb"),
    require("../../../../../Assets/3dModels/arcadeTheme/d-dcomp-armchair-1.glb"),
    require("../../../../../Assets/3dModels/arcadeTheme/d-dcomp-bigplant-1.glb"),
  ],
  entryDoorModel: require("../../../../../Assets/3dModels/arcadeTheme/d-door-arcade-entry.glb"),
  exitDoorModel: require("../../../../../Assets/3dModels/arcadeTheme/d-door-arcade-exit.glb"),
  windowModel: require("../../../../../Assets/3dModels/arcadeTheme/d-window-arcade-with-blind.glb"),
  ambienceModel: require("../../../../../Assets/3dModels/arcadeTheme/env-arcade.glb"),
  storyElementModel:
    LearningElementModelTypeEnums.QuizElementModelTypes.DefaultArcadeNPC,
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../../Assets/3dModels/arcadeTheme/d-roomcomp-l-arcade-in.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../../Assets/3dModels/arcadeTheme/d-roomcomp-r6-arcade-in.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../../Assets/3dModels/arcadeTheme/d-roomcomp-r8-arcade-in.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../../Assets/3dModels/arcadeTheme/d-roomcomp-d-arcade-in.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../../Assets/3dModels/arcadeTheme/d_roomcomp-t-arcade-in.glb"),
    [LearningSpaceTemplateType.None]: "",
  },
  outsideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../../Assets/3dModels/arcadeTheme/d-roomcomp-l-arcade-out.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../../Assets/3dModels/arcadeTheme/d-roomcomp-r6-arcade-out.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../../Assets/3dModels/arcadeTheme/d-roomcomp-r8-arcade-out.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../../Assets/3dModels/arcadeTheme/d-roomcomp-d-arcade-out.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../../Assets/3dModels/arcadeTheme/d-roomcomp-t-arcade-out.glb"),
    [LearningSpaceTemplateType.None]: "",
  },
};

export default LearningSpaceTheme_Arcade;
