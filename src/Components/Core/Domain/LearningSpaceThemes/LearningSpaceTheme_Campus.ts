import { LearningElementTypes } from "../Types/LearningElementTypes";
import { LearningSpaceThemeTypes } from "../Types/LearningSpaceThemeTypes";
import ILearningSpaceTheme from "./ILearningSpaceTheme";

const LearningSpaceTheme_Campus: ILearningSpaceTheme = {
  name: LearningSpaceThemeTypes.Campus,
  wallTexture: require("../../../../../Assets/textures/Plaster001_1K_Color.jpg"),
  floorTexture: require("../../../../../Assets/textures/WoodFloor051_1K_Color.jpg"),
  learningElementModels: {
    [LearningElementTypes.h5p]: [
      require("../../../../../Assets/3dModels/defaultTheme/l_h5p_deskpc_1.glb"),
      require("../../../../../Assets/3dModels/defaultTheme/l_h5p_slotmachine_1.glb"),
      require("../../../../../Assets/3dModels/defaultTheme/l_h5p_blackboard_1.glb"),
      require("../../../../../Assets/3dModels/defaultTheme/l_h5p_drawingtable_1.glb"),
    ],
    [LearningElementTypes.text]: [
      require("../../../../../Assets/3dModels/defaultTheme/l_text_bookshelf_1.glb"),
      require("../../../../../Assets/3dModels/defaultTheme/l_text_bookshelf_2.glb"),
    ],
    [LearningElementTypes.image]: [
      require("../../../../../Assets/3dModels/defaultTheme/l_picture_painting_1.glb"),
      require("../../../../../Assets/3dModels/defaultTheme/l_picture_painting_2.glb"),
      require("../../../../../Assets/3dModels/defaultTheme/l_picture_paintingeasel_1.glb"),
    ],
    [LearningElementTypes.video]: [
      require("../../../../../Assets/3dModels/defaultTheme/l_video_television_1.glb"),
    ],
    [LearningElementTypes.pdf]: [
      require("../../../../../Assets/3dModels/defaultTheme/l_text_bookshelf_1.glb"),
      require("../../../../../Assets/3dModels/defaultTheme/l_text_bookshelf_2.glb"),
    ],
    [LearningElementTypes.quiz]: [],
    [LearningElementTypes.notAnElement]: [],
  },
  standinDecorationModels: [
    require("../../../../../Assets/3dModels/defaultTheme/d-moebel-komp-1.glb"),
    require("../../../../../Assets/3dModels/defaultTheme/d-moebel-komp-2.glb"),
    require("../../../../../Assets/3dModels/defaultTheme/d-moebel-komp-3.glb"),
  ],
  entryDoorModel: require("../../../../../Assets/3dModels/defaultTheme/3DModel_Door.glb"),
  exitDoorModel: require("../../../../../Assets/3dModels/defaultTheme/3DModel_ExitDoor.glb"),
  windowModel: require("../../../../../Assets/3dModels/defaultTheme/3DModel_Window.glb"),
};

export default LearningSpaceTheme_Campus;
