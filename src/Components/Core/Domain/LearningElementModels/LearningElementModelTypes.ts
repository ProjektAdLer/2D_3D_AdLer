enum TextElementModelTypes {
  //default
  Bookshelf1 = "l_text_bookshelf_1",
  Bookshelf2 = "l_text_bookshelf_2",
  //arcade
  ComicShelfbig = "l-text-comicshelfbig-1",
  ComicShelfsmall = "l-text-comicshelfsmall-1",
  //campus
  LibraryShelf = "l_text_libraryshelf_1",
}

enum ImageElementModelTypes {
  //default
  Painting1 = "l_image_painting_1",
  Painting2 = "l_image_painting_2",
  PaintingEasel = "l_image_paintingeasel_1",
  //arcade
  Gameposter1 = "l-image-gameposter-1",
  Gameposter2 = "l-image-gameposter-2",
  CardboardCutout = "l-image-cardboardcutout-1",
  //campus
  ScienceGeo1 = "l_image_sciencegeo_1",
  ScienceBio1 = "l_image_sciencebio_1",
  ScienceWhiteboard = "l_image_sciencewhiteboard_1",
}

enum VideoElementModelTypes {
  //default
  Television = "l_video_television_1",
  //arcade
  VrDesk = "l-video-vrdesk-1",
  //campus
  MovieProjector = "l_video_movieprojector_1",
}

// enum PdfElementModelTypes {}

enum H5pElementModelTypes {
  //default
  Blackboard = "l_h5p_blackboard_1",
  DeskPC1 = "l_h5p_deskpc_1",
  DrawingTable = "l_h5p_drawingtable_1",
  SlotMachine = "l_h5p_slotmachine_1",
  //arcade
  GreySlotmachine = "l-h5p-greyslotmachine-1",
  RedSlotmachine = "l-h5p-redslotmachine-1",
  PurpleSlotmachine = "l-h5p-purpleslotmachine-1",
  BlackSlotmachine = "l-h5p-blackslotmachine-1",
  DeskPC2 = "l-h5p-deskpc-2",
  //campus
  Blackboard2 = "l_h5p_blackboard_2",
  DeskPC3 = "l_h5p_deskpc_3",
  DrawingTable2 = "l_h5p_drawingtable_2",
  DaylightProjector = "l_h5p_daylightprojector_1",
}

export enum QuizElementModelTypes {
  RobotNPC = "a-quizbg-alerobot",
  DefaultNPC = "a-quizbg-defaultnpc",
  ArcadeNPC = "a-npc-sheriffjustice",
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
    Object.values(enumType).includes(type),
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
