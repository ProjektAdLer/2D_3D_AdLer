import { LearningElementModelTypeEnums } from "../../LearningElementModels/LearningElementModelTypes";
import { LearningElementTypes } from "../../Types/LearningElementTypes";
import { LearningSpaceTemplateType } from "../../Types/LearningSpaceTemplateType";
import ILearningSpaceTheme from "../ILearningSpaceTheme";

const LearningSpaceTheme_Suburb: ILearningSpaceTheme = {
  wallTexture: require("../../../../../Assets/textures/suburbTheme/m_wall_roughbricks_1.jpg"),
  floorTexture: require("../../../../../Assets/textures/suburbTheme/m_floor_woodboards_1.jpg"),
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
      LearningElementModelTypeEnums.QuizElementModelTypes.AleRobotNPC,
    ],
    [LearningElementTypes.notAnElement]: [],
  },
  standinDecorationModels: [
    require("../../../../../Assets/3dModels/suburbTheme/d-dcomp-hatstand-1.glb"),
    require("../../../../../Assets/3dModels/suburbTheme/d-dcomp-desk-1.glb"),
    require("../../../../../Assets/3dModels/suburbTheme/d-dcomp-sideboardbookshelf-1.glb"),
  ],
  entryDoorModel: require("../../../../../Assets/3dModels/suburbTheme/d-door-suburb-entry.glb"),
  exitDoorModel: require("../../../../../Assets/3dModels/suburbTheme/d-door-suburb-exit.glb"),
  windowModel: require("../../../../../Assets/3dModels/suburbTheme/d-door-suburb-window.glb"),
  ambienceModel: require("../../../../../Assets/3dModels/suburbTheme/env-suburb.glb"),
  storyElementModel:
    LearningElementModelTypeEnums.QuizElementModelTypes.DefaultSuburbNPC,
  insideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../../Assets/3dModels/suburbTheme/d-roomcomp-l-suburb-in.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../../Assets/3dModels/suburbTheme/d-roomcomp-r6-suburb-in.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../../Assets/3dModels/suburbTheme/d-roomcomp-r8-suburb-in.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../../Assets/3dModels/suburbTheme/d-roomcomp-d-suburb-in.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../../Assets/3dModels/suburbTheme/d-roomcomp-t-suburb-in.glb"),
    [LearningSpaceTemplateType.None]: "",
  },
  outsideDecorationModels: {
    [LearningSpaceTemplateType.L]: require("../../../../../Assets/3dModels/suburbTheme/d-roomcomp-l-suburb-out.glb"),
    [LearningSpaceTemplateType.R6]: require("../../../../../Assets/3dModels/suburbTheme/d-roomcomp-r6-suburb-out.glb"),
    [LearningSpaceTemplateType.R8]: require("../../../../../Assets/3dModels/suburbTheme/d-roomcomp-r8-suburb-out.glb"),
    [LearningSpaceTemplateType.D]: require("../../../../../Assets/3dModels/suburbTheme/d-roomcomp-d-suburb-out.glb"),
    [LearningSpaceTemplateType.T]: require("../../../../../Assets/3dModels/suburbTheme/d-roomcomp-t-suburb-out.glb"),
    [LearningSpaceTemplateType.None]: "",
  },
};

export default LearningSpaceTheme_Suburb;
