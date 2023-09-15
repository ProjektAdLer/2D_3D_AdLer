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
  //suburbTheme
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .Blackboard]: require("../../../../Assets/3dModels/suburbTheme/l_h5p_blackboard_1.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .DeskPC1]: require("../../../../Assets/3dModels/suburbTheme/l_h5p_deskpc_1.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .DrawingTable]: require("../../../../Assets/3dModels/suburbTheme/l_h5p_drawingtable_1.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .SlotMachine]: require("../../../../Assets/3dModels/suburbTheme/l_h5p_slotmachine_1.glb"),
  [LearningElementModelTypeEnums.TextElementModelTypes
    .Bookshelf1]: require("../../../../Assets/3dModels/suburbTheme/l_text_bookshelf_1.glb"),
  [LearningElementModelTypeEnums.TextElementModelTypes
    .Bookshelf2]: require("../../../../Assets/3dModels/suburbTheme/l_text_bookshelf_2.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .Painting1]: require("../../../../Assets/3dModels/suburbTheme/l_image_painting_1.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .Painting2]: require("../../../../Assets/3dModels/suburbTheme/l_image_painting_2.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .PaintingEasel]: require("../../../../Assets/3dModels/suburbTheme/l_image_paintingeasel_1.glb"),
  [LearningElementModelTypeEnums.VideoElementModelTypes
    .Television]: require("../../../../Assets/3dModels/suburbTheme/l_video_television_1.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .DefaultNPC]: require("../../../../Assets/3dModels/suburbTheme/a_npc_defaultnpc.glb"),

  //ArcadeTheme
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .GreySlotmachine]: require("../../../../Assets/3dModels/arcadeTheme/l_h5p_greyslotmachine_1.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .RedSlotmachine]: require("../../../../Assets/3dModels/arcadeTheme/l_h5p_redslotmachine_1.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .PurpleSlotmachine]: require("../../../../Assets/3dModels/arcadeTheme/l_h5p_purpleslotmachine_1.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .BlackSlotmachine]: require("../../../../Assets/3dModels/arcadeTheme/l_h5p_blackslotmachine_1.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .DeskPC2]: require("../../../../Assets/3dModels/arcadeTheme/l_h5p_deskpc_2.glb"),
  [LearningElementModelTypeEnums.TextElementModelTypes
    .ComicShelfbig]: require("../../../../Assets/3dModels/arcadeTheme/l_text_comicshelfbig_1.glb"),
  [LearningElementModelTypeEnums.TextElementModelTypes
    .ComicShelfsmall]: require("../../../../Assets/3dModels/arcadeTheme/l_text_comicshelfsmall_1.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .Gameposter1]: require("../../../../Assets/3dModels/arcadeTheme/l_image_gameposter_1.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .Gameposter2]: require("../../../../Assets/3dModels/arcadeTheme/l_image_gameposter_2.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .Cardboardcutout]: require("../../../../Assets/3dModels/arcadeTheme/l_image_cardboardcutout_1.glb"),
  [LearningElementModelTypeEnums.VideoElementModelTypes
    .vrdesk]: require("../../../../Assets/3dModels/arcadeTheme/l_video_vrdesk_1.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .ArcadeNPC]: require("../../../../Assets/3dModels/arcadeTheme/a_npc_sheriffjustice.glb"),

  //CampusTheme
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .Blackboard2]: require("../../../../Assets/3dModels/campusTheme/l_h5p_blackboard_2.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .DeskPC3]: require("../../../../Assets/3dModels/campusTheme/l_h5p_deskpc_3.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .DrawingTable2]: require("../../../../Assets/3dModels/campusTheme/l_h5p_drawingtable_2.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .Daylightprojector]: require("../../../../Assets/3dModels/campusTheme/l_h5p_daylightprojector_1.glb"),
  [LearningElementModelTypeEnums.TextElementModelTypes
    .LibraryShelf]: require("../../../../Assets/3dModels/campusTheme/l_text_libraryshelf_1.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .sciencegeo1]: require("../../../../Assets/3dModels/campusTheme/l_image_sciencegeo_1.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .sciencebio1]: require("../../../../Assets/3dModels/campusTheme/l_image_sciencebio_1.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .sciencewhiteboard]: require("../../../../Assets/3dModels/campusTheme/l_image_sciencewhiteboard_1.glb"),
  [LearningElementModelTypeEnums.VideoElementModelTypes
    .movieprojector]: require("../../../../Assets/3dModels/campusTheme/l_video_movieprojector_1.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .CampusNPC]: require("../../../../Assets/3dModels/campusTheme/a_npc_dozentlukas.glb"),

  [LearningElementModelTypeEnums.TrophyElementModelTypes
    .BronzeTrophy]: require("../../../../Assets/prototype/l_trophy_bronze.glb"),
  [LearningElementModelTypeEnums.TrophyElementModelTypes
    .SilverTrophy]: require("../../../../Assets/prototype/l_trophy_silver.glb"),
  [LearningElementModelTypeEnums.TrophyElementModelTypes
    .GoldTrophy]: require("../../../../Assets/prototype/l_trophy_gold.glb"),
};

export default LearningElementModelLookup;
