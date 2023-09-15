import { LearningElementTypes } from "../Types/LearningElementTypes";
import { LearningSpaceThemeType } from "../Types/LearningSpaceThemeTypes";
import ILearningSpaceTheme from "./ILearningSpaceTheme";

const LearningSpaceTheme_Campus: ILearningSpaceTheme = {
  name: LearningSpaceThemeType.Campus,
  wallTexture: require("../../../../Assets/textures/campusTheme/1Wall.jpg"),
  floorTexture: require("../../../../Assets/textures/campusTheme/1Floor.jpg"),
  learningElementModels: {
    [LearningElementTypes.h5p]: [
      require("../../../../Assets/3dModels/campusTheme/l_h5p_blackboard_2.glb"),
      require("../../../../Assets/3dModels/campusTheme/l_h5p_deskpc_3.glb"),
      require("../../../../Assets/3dModels/campusTheme/l_h5p_drawingtable_2.glb"),
      require("../../../../Assets/3dModels/campusTheme/l_h5p_daylightprojector_1.glb"),
    ],
    [LearningElementTypes.text]: [
      require("../../../../Assets/3dModels/campusTheme/l_text_libraryshelf_1.glb"),
    ],
    [LearningElementTypes.image]: [
      require("../../../../Assets/3dModels/campusTheme/l_image_sciencegeo_1.glb"),
      require("../../../../Assets/3dModels/campusTheme/l_image_sciencebio_1.glb"),
      require("../../../../Assets/3dModels/campusTheme/l_image_sciencewhiteboard_1.glb"),
    ],
    [LearningElementTypes.video]: [
      require("../../../../Assets/3dModels/campusTheme/l_video_movieprojector_1.glb"),
    ],
    [LearningElementTypes.pdf]: [
      require("../../../../Assets/3dModels/campusTheme/l_text_libraryshelf_1.glb"),
    ],
    [LearningElementTypes.quiz]: [
      require("../../../../Assets/3dModels/campusTheme/a_npc_dozentlukas.glb"),
    ],
    [LearningElementTypes.notAnElement]: [],
  },
  standinDecorationModels: [
    require("../../../../Assets/3dModels/campusTheme/d_dcomp_schooldesk_1.glb"),
    require("../../../../Assets/3dModels/campusTheme/d_dcomp_watertower_1.glb"),
    require("../../../../Assets/3dModels/campusTheme/d_dcomp_vendingmachine_1.glb"),
  ],
  entryDoorModel: require("../../../../Assets/3dModels/campusTheme/3DModel_Door.glb"),
  exitDoorModel: require("../../../../Assets/3dModels/campusTheme/3DModel_ExitDoor.glb"),
  windowModel: require("../../../../Assets/3dModels/campusTheme/3DModel_Window.glb"),
  ambienceModel: require("../../../../Assets/3dModels/campusTheme/campus.glb"),
};

export default LearningSpaceTheme_Campus;
