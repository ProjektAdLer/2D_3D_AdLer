import { LearningElementTypes } from "../Types/LearningElementTypes";
import { LearningSpaceThemeType } from "../Types/LearningSpaceThemeTypes";
import ILearningSpaceTheme from "./ILearningSpaceTheme";

const LearningSpaceTheme_Campus: ILearningSpaceTheme = {
  name: LearningSpaceThemeType.Campus,
  wallTexture: require("../../../../Assets/textures/campusTheme/1Wall.jpg"),
  floorTexture: require("../../../../Assets/textures/campusTheme/1Floor.jpg"),
  learningElementModels: {
    [LearningElementTypes.h5p]: [
      require("../../../../Assets/3dModels/campusTheme/l_h5p_deskpc_1.glb"),
      require("../../../../Assets/3dModels/campusTheme/l_h5p_slotmachine_1.glb"),
      require("../../../../Assets/3dModels/campusTheme/l_h5p_blackboard_1.glb"),
      require("../../../../Assets/3dModels/campusTheme/l_h5p_drawingtable_1.glb"),
    ],
    [LearningElementTypes.text]: [
      require("../../../../Assets/3dModels/campusTheme/l_text_bookshelf_1.glb"),
      require("../../../../Assets/3dModels/campusTheme/l_text_bookshelf_2.glb"),
    ],
    [LearningElementTypes.image]: [
      require("../../../../Assets/3dModels/campusTheme/l_picture_painting_1.glb"),
      require("../../../../Assets/3dModels/campusTheme/l_picture_painting_2.glb"),
      require("../../../../Assets/3dModels/campusTheme/l_picture_paintingeasel_1.glb"),
    ],
    [LearningElementTypes.video]: [
      require("../../../../Assets/3dModels/campusTheme/l_video_television_1.glb"),
    ],
    [LearningElementTypes.pdf]: [
      require("../../../../Assets/3dModels/campusTheme/l_text_bookshelf_1.glb"),
      require("../../../../Assets/3dModels/campusTheme/l_text_bookshelf_2.glb"),
    ],
    [LearningElementTypes.quiz]: [
      require("../../../../Assets/3dModels/campusTheme/LukasNPC.glb"),
    ],
    [LearningElementTypes.notAnElement]: [],
  },
  standinDecorationModels: [
    require("../../../../Assets/3dModels/campusTheme/d-moebel-komp-1.glb"),
    require("../../../../Assets/3dModels/campusTheme/d-moebel-komp-2.glb"),
    require("../../../../Assets/3dModels/campusTheme/d-moebel-komp-3.glb"),
  ],
  entryDoorModel: require("../../../../Assets/3dModels/campusTheme/3DModel_Door.glb"),
  exitDoorModel: require("../../../../Assets/3dModels/campusTheme/3DModel_ExitDoor.glb"),
  windowModel: require("../../../../Assets/3dModels/campusTheme/3DModel_Window.glb"),
};

export default LearningSpaceTheme_Campus;
