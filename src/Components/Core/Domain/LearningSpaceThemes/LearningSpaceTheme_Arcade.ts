import { LearningElementTypes } from "../Types/LearningElementTypes";
import { LearningSpaceThemeType } from "../Types/LearningSpaceThemeTypes";
import ILearningSpaceTheme from "./ILearningSpaceTheme";

const LearningSpaceTheme_Arcade: ILearningSpaceTheme = {
  name: LearningSpaceThemeType.Arcade,
  wallTexture: require("../../../../Assets/textures/arcadeTheme/1Wall.jpg"),
  floorTexture: require("../../../../Assets/textures/arcadeTheme/1Floor.jpg"),
  learningElementModels: {
    [LearningElementTypes.h5p]: [
      require("../../../../Assets/3dModels/arcadeTheme/l_h5p_greyslotmachine_1.glb"),
      require("../../../../Assets/3dModels/arcadeTheme/l_h5p_redslotmachine_1.glb"),
      require("../../../../Assets/3dModels/arcadeTheme/l_h5p_purpleslotmachine_1.glb"),
      require("../../../../Assets/3dModels/arcadeTheme/l_h5p_blackslotmachine_1.glb"),
      require("../../../../Assets/3dModels/arcadeTheme/l_h5p_deskpc_2.glb"),
    ],
    [LearningElementTypes.text]: [
      require("../../../../Assets/3dModels/arcadeTheme/l_text_comicshelfbig_1.glb"),
    ],
    [LearningElementTypes.image]: [
      require("../../../../Assets/3dModels/arcadeTheme/l_image_gameposter_1.glb"),
      require("../../../../Assets/3dModels/arcadeTheme/l_image_gameposter_2.glb"),
      require("../../../../Assets/3dModels/arcadeTheme/l_image_cardboardcutout_1.glb"),
    ],
    [LearningElementTypes.video]: [
      require("../../../../Assets/3dModels/arcadeTheme/l_video_vrdesk_1.glb"),
    ],
    [LearningElementTypes.pdf]: [
      require("../../../../Assets/3dModels/arcadeTheme/l_text_comicshelfsmall_1.glb"),
    ],
    [LearningElementTypes.quiz]: [
      require("../../../../Assets/3dModels/arcadeTheme/a_npc_sheriffjustice.glb"),
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
};

export default LearningSpaceTheme_Arcade;
