import { LearningElementTypes } from "../Types/LearningElementTypes";
import { LearningSpaceThemeType } from "../Types/LearningSpaceThemeTypes";
import ILearningSpaceTheme from "./ILearningSpaceTheme";

const LearningSpaceTheme_Default: ILearningSpaceTheme = {
  name: LearningSpaceThemeType.Default,
  wallTexture: require("../../../../Assets/textures/defaultTheme/1Wall.jpg"),
  floorTexture: require("../../../../Assets/textures/defaultTheme/1Floor.jpg"),
  learningElementModels: {
    [LearningElementTypes.h5p]: [
      require("../../../../Assets/3dModels/defaultTheme/l_h5p_blackboard_1.glb"),
      require("../../../../Assets/3dModels/defaultTheme/l_h5p_deskpc_1.glb"),
      require("../../../../Assets/3dModels/defaultTheme/l_h5p_drawingtable_1.glb"),
      require("../../../../Assets/3dModels/defaultTheme/l_h5p_slotmachine_1.glb"),
    ],
    [LearningElementTypes.text]: [
      require("../../../../Assets/3dModels/defaultTheme/l_text_bookshelf_1.glb"),
    ],
    [LearningElementTypes.image]: [
      require("../../../../Assets/3dModels/defaultTheme/l_image_painting_1.glb"),
      require("../../../../Assets/3dModels/defaultTheme/l_image_painting_2.glb"),
      require("../../../../Assets/3dModels/defaultTheme/l_image_paintingeasel_1.glb"),
    ],
    [LearningElementTypes.video]: [
      require("../../../../Assets/3dModels/defaultTheme/l_video_television_1.glb"),
    ],
    [LearningElementTypes.pdf]: [
      require("../../../../Assets/3dModels/defaultTheme/l_text_bookshelf_2.glb"),
    ],
    [LearningElementTypes.quiz]: [
      require("../../../../Assets/3dModels/defaultTheme/a_npc_defaultnpc.glb"),
    ],
    [LearningElementTypes.notAnElement]: [],
  },
  standinDecorationModels: [
    require("../../../../Assets/3dModels/defaultTheme/d_dcomp_dinnertable_1.glb"),
    require("../../../../Assets/3dModels/defaultTheme/d_dcomp_desk_1.glb"),
    require("../../../../Assets/3dModels/defaultTheme/d_dcomp_sideboardbookshelf_1.glb"),
  ],
  entryDoorModel: require("../../../../Assets/3dModels/defaultTheme/3DModel_Door.glb"),
  exitDoorModel: require("../../../../Assets/3dModels/defaultTheme/3DModel_ExitDoor.glb"),
  windowModel: require("../../../../Assets/3dModels/defaultTheme/3DModel_Window.glb"),
};

export default LearningSpaceTheme_Default;
