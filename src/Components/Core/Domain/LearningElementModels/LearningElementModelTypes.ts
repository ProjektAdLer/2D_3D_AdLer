enum TextElementModelTypes {
  //default
  Bookshelf1 = "l_text_bookshelf_1",
  Bookshelf2 = "l_text_bookshelf_2",
  //arcade
  ComicShelfbig = "l_text_comicshelfbig_1",
  ComicShelfsmall = "l_text_comicshelfsmall_1",
  //campus
  LibraryShelf = "l_text_libraryshelf_1",
}

enum ImageElementModelTypes {
  //default
  Painting1 = "l_image_painting_1",
  Painting2 = "l_image_painting_2",
  PaintingEasel = "l_image_paintingeasel_1",
  //arcade
  Gameposter1 = "l_image_gameposter_1",
  Gameposter2 = "l_image_gameposter_2",
  Cardboardcutout = "l_image_cardboardcutout_1",
  //campus
  sciencegeo1 = "l_image_sciencegeo_1",
  sciencebio1 = "l_image_sciencebio_1",
  sciencewhiteboard = "l_image_sciencewhiteboard_1",
}

enum VideoElementModelTypes {
  //default
  Television = "l_video_television_1",
  //arcade
  vrdesk = "l_video_vrdesk_1",
  //campus
  movieprojector = "l_video_movieprojector_1",
}

// enum PdfElementModelTypes {}

enum H5pElementModelTypes {
  //default
  Blackboard = "l_h5p_blackboard_1",
  DeskPC1 = "l_h5p_deskpc_1",
  DrawingTable = "l_h5p_drawingtable_1",
  SlotMachine = "l_h5p_slotmachine_1",
  //arcade
  GreySlotmachine = "l_h5p_greyslotmachine_1",
  RedSlotmachine = "l_h5p_redslotmachine_1",
  PurpleSlotmachine = "l_h5p_purpleslotmachine_1",
  BlackSlotmachine = "l_h5p_blackslotmachine_1",
  DeskPC2 = "l_h5p_deskpc_2",
  //campus
  Blackboard2 = "l_h5p_blackboard_2",
  DeskPC3 = "l_h5p_deskpc_3",
  DrawingTable2 = "l_h5p_drawingtable_2",
  Daylightprojector = "l_h5p_daylightprojector_1",
}

enum QuizElementModelTypes {
  RobotNPC = "a_npc_alerobot",
  DefaultNPC = "a_npc_defaultnpc",
  ArcadeNPC = "a_npc_sheriffjustice",
  CampusNPC = "a_npc_dozentlukas",
}
enum TrophyElementModelTypes {
  BronzeTrophy = "l_trophy_bronze",
  SilverTrophy = "l_trophy_silver",
  GoldTrophy = "l_trophy_gold",
}

// enum NoElementModelTypes {
//   None = "",
// }

/** 
 Pseudo-nested enum to reference all possible members of the element model enums.
 */
export const LearningElementModelTypeEnums = {
  TextElementModelTypes: TextElementModelTypes,
  ImageElementModelTypes: ImageElementModelTypes,
  VideoElementModelTypes: VideoElementModelTypes,
  // PdfElementModelTypes: PdfElementModelTypes,
  H5pElementModelTypes: H5pElementModelTypes,
  QuizElementModelTypes: QuizElementModelTypes,
  TrophyElementModelTypes: TrophyElementModelTypes,
  // NoElementModelTypes: NoElementModelTypes,
};

export function isValidLearningElementModelType(type: string): boolean {
  return Object.values(LearningElementModelTypeEnums).some((enumType) =>
    Object.values(enumType).includes(type)
  );
}

/**
 Type of a learning element model.
  */
export type LearningElementModel =
  | TextElementModelTypes
  | ImageElementModelTypes
  | VideoElementModelTypes
  // | PdfElementModelTypes
  | H5pElementModelTypes
  | QuizElementModelTypes
  | TrophyElementModelTypes;
// | NoElementModelTypes;
