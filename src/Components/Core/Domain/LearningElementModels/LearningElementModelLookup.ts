import {
  LearningElementModel,
  LearningElementModelTypeEnums,
} from "./LearningElementModelTypes";

/**
 * Lookup that lists all possible models for learning elements referenced by their names.
 */
const LearningElementModelLookup: {
  [key in LearningElementModel]?: any;
} = {
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .Blackboard]: require("../../../../Assets/3dModels/defaultTheme/l_h5p_blackboard_1.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .DeskPC]: require("../../../../Assets/3dModels/defaultTheme/l_h5p_deskpc_1.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .DrawingTable]: require("../../../../Assets/3dModels/defaultTheme/l_h5p_drawingtable_1.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .SlotMachine]: require("../../../../Assets/3dModels/defaultTheme/l_h5p_slotmachine_1.glb"),
  [LearningElementModelTypeEnums.TextElementModelTypes
    .Bookshelf1]: require("../../../../Assets/3dModels/defaultTheme/l_text_bookshelf_1.glb"),
  [LearningElementModelTypeEnums.TextElementModelTypes
    .Bookshelf2]: require("../../../../Assets/3dModels/defaultTheme/l_text_bookshelf_2.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .Painting1]: require("../../../../Assets/3dModels/defaultTheme/l_picture_painting_1.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .Painting2]: require("../../../../Assets/3dModels/defaultTheme/l_picture_painting_2.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .PaintingEasel]: require("../../../../Assets/3dModels/defaultTheme/l_picture_paintingeasel_1.glb"),
  [LearningElementModelTypeEnums.VideoElementModelTypes
    .Television]: require("../../../../Assets/3dModels/defaultTheme/l_video_television_1.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .QuizNPC]: require("../../../../Assets/3dModels/defaultTheme/LukasNPC.glb"),
};

export default LearningElementModelLookup;
