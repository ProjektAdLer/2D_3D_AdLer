import { LearningElementTypes } from "../Types/LearningElementTypes";
import { LearningSpaceThemeType } from "../Types/LearningSpaceThemeTypes";
import ILearningSpaceTheme from "./ILearningSpaceTheme";

const LearningSpaceTheme_Suburb: ILearningSpaceTheme = {
  name: LearningSpaceThemeType.Suburb,
  wallTexture: require("../../../../Assets/textures/suburbTheme/m_wall_roughbricks_1.jpg"),
  floorTexture: require("../../../../Assets/textures/suburbTheme/m_floor_woodboards_1.jpg"),
  learningElementModels: {
    [LearningElementTypes.h5p]: [
      require("../../../../Assets/3dModels/suburbTheme/l_h5p_blackboard_1.glb"),
      require("../../../../Assets/3dModels/suburbTheme/l_h5p_deskpc_1.glb"),
      require("../../../../Assets/3dModels/suburbTheme/l_h5p_drawingtable_1.glb"),
      require("../../../../Assets/3dModels/suburbTheme/l_h5p_slotmachine_1.glb"),
    ],
    [LearningElementTypes.text]: [
      require("../../../../Assets/3dModels/suburbTheme/l_text_bookshelf_1.glb"),
    ],
    [LearningElementTypes.image]: [
      require("../../../../Assets/3dModels/suburbTheme/l_image_painting_1.glb"),
      require("../../../../Assets/3dModels/suburbTheme/l_image_painting_2.glb"),
      require("../../../../Assets/3dModels/suburbTheme/l_image_paintingeasel_1.glb"),
    ],
    [LearningElementTypes.video]: [
      require("../../../../Assets/3dModels/suburbTheme/l_video_television_1.glb"),
    ],
    [LearningElementTypes.pdf]: [
      require("../../../../Assets/3dModels/suburbTheme/l_text_bookshelf_2.glb"),
    ],
    [LearningElementTypes.quiz]: [
      require("../../../../Assets/3dModels/suburbTheme/a_npc_defaultnpc.glb"),
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
