enum TextElementModelTypes {
  //default
  Bookshelf1 = "l-text-bookshelf-1",
  Bookshelf2 = "l-text-bookshelf-2",
  //arcade
  ComicShelfbig = "l-text-comicshelfbig-1",
  ComicShelfsmall = "l-text-comicshelfsmall-1",
  //campus
  LibraryShelf = "l-text-libraryshelf-1",
}

enum ImageElementModelTypes {
  //default
  Painting1 = "l-image_painting-1",
  Painting2 = "l-image_painting-2",
  PaintingEasel = "l-image-paintingeasel-1",
  //arcade
  Gameposter1 = "l-image-gameposter-1",
  Gameposter2 = "l-image-gameposter-2",
  CardboardCutout = "l-image-cardboardcutout-1",
  //campus
  ScienceGeo1 = "l-image-sciencegeo-1",
  ScienceBio1 = "l-image-sciencebio-1",
  ScienceWhiteboard = "l-image-sciencewhiteboard-1",
}

enum VideoElementModelTypes {
  //default
  Television = "l-video-television-1",
  //arcade
  VrDesk = "l-video-vrdesk-1",
  //campus
  MovieProjector = "l-video-movieprojector-1",
}

// enum PdfElementModelTypes {}

enum H5pElementModelTypes {
  //default
  Blackboard = "l-h5p-blackboard-1",
  DeskPC1 = "l-h5p-deskpc-1",
  DrawingTable = "l-h5p-drawingtable-1",
  SlotMachine = "l-h5p-slotmachine-1",
  //arcade
  GreySlotmachine = "l-h5p-greyslotmachine-1",
  RedSlotmachine = "l-h5p-redslotmachine-1",
  PurpleSlotmachine = "l-h5p-purpleslotmachine-1",
  BlackSlotmachine = "l-h5p-blackslotmachine-1",
  DeskPC2 = "l-h5p-deskpc-2",
  //campus
  Blackboard2 = "l-h5p-blackboard-2",
  DeskPC3 = "l-h5p-deskpc-3",
  DrawingTable2 = "l-h5p-drawingtable-2",
  DaylightProjector = "l-h5p-daylightprojector-1",
}

export enum QuizElementModelTypes {
  // Defaults:
  DefaultSuburbNPC = "a-npc-defaultsuburb",
  DefaultArcadeNPC = "a-npc-defaultarcade",
  DefaultCampusNPC = "a-npc-defaultcampus",
  DefaultNPC = "a-npc-defaultdark-female",
  //defaultMaleNPC
  //defaultFemaleNPC
  // Non-Defaults:
  AleRobotNPC = "a-npc-alerobot",
  BullyFemaleNPC = "a-npc-bully-female", // for backwords compability
  BullyMaleNPC = "a-npc-bully-male", // for backwords compability
  BullyDarkFemaleNPC = "a-npc-bullydark-female",
  BullyDarkMaleNPC = "a-npc-bullydark-male",
  BullyLightFemaleNPC = "a-npc-bullylight-female",
  BullyLightMaleNPC = "a-npc-bullylight-male",
  DefaultDarkFemaleNPC = "a-npc-defaultdark-female", // NOSONAR
  DefaultDarkMaleNPC = "a-npc-defaultdark-male",
  DefaultLightMaleNPC = "a-npc-defaultlight-male",

  // DozentAntoniaNPC = "a-npc-teame-female", // for backwords compability
  // DozentDanielNPC = "a-npc-teamc-male", // for backwords compability
  // DozentGeorgNPC = "a-npc-teamb-male", // for backwords compability
  // DozentJoergNPC = "a-npc-teamd-male", // for backwords compability
  // DozentLukasNPC = "a-npc-teama-male", // for backwords compability
  TeamAMaleNPC = "a-npc-teama-male", // NOSONAR
  TeamBMaleNPC = "a-npc-teamb-male", // NOSONAR
  TeamCMaleNPC = "a-npc-teamc-male", // NOSONAR
  TeamDMaleNPC = "a-npc-teamd-male", // NOSONAR
  TeamEFemaleNPC = "a-npc-teame-female", // NOSONAR
  DozentAntoniaNPC = "a-npc-dozentantonia", // for backwords compability
  DozentDanielNPC = "a-npc-dozentdaniel", // for backwords compability
  DozentGeorgNPC = "a-npc-dozentgeorg", // for backwords compability
  DozentJoergNPC = "a-npc-dozentjoerg", // for backwords compability
  DozentLukasNPC = "a-npc-dozentlukas", // for backwords compability

  HiphopFemaleNPC = "a-npc-hiphop-female", // for backwords compability
  HiphopMaleNPC = "a-npc-hiphop-male", // for backwords compability
  HipHopDarkFemaleNPC = "a-npc-hiphopdark-female",
  HipHopDarkMaleNPC = "a-npc-hiphopdark-male",
  HipHopLightFemaleNPC = "a-npc-hiphoplight-female",
  HipHopLightMaleNPC = "a-npc-hiphoplight-male",
  NerdDarkFemaleNPC = "a-npc-nerddark-female",
  NerdDarkMaleNPC = "a-npc-nerddark-male",
  NerdLightFemaleNPC = "a-npc-nerdlight-female",
  NerdLightMaleNPC = "a-npc-nerdlight-male",
  OldieDarkFemaleNPC = "a-npc-oldiedark-female",
  OldieDarkMaleNPC = "a-npc-oldiedark-male",
  OldieLightFemaleNPC = "a-npc-oldielight-female",
  OldieLightMaleNPC = "a-npc-oldielight-male",
  SantaFemaleNPC = "a-npc-santa-female",
  SantaMaleNPC = "a-npc-santa-male",
  SheriffJusticeNPC = "a-npc-sheriffjustice",
  StudentDarkFemaleNPC = "a-npc-studentdark-female",
  StudentDarkMaleNPC = "a-npc-studentdark-male",
  StudentLightFemaleNPC = "a-npc-studentlight-female",
  StudentLightMaleNPC = "a-npc-studentlight-male",
}

enum TrophyElementModelTypes {
  BronzeTrophy = "l-trophy-bronze",
  SilverTrophy = "l-trophy-silver",
  GoldTrophy = "l-trophy-gold",
}

// export enum CompabilityElementModelTypes {
//   //default
//   Bookshelf1 = "l_text_bookshelf_1",
//   Bookshelf2 = "l_text_bookshelf_2",
//   LibraryShelf = "l_text_libraryshelf_1",

//   //default
//   Painting1 = "l_image_painting_1",
//   Painting2 = "l_image_painting_2",
//   PaintingEasel = "l_image_paintingeasel_1",

//   //campus
//   ScienceGeo1 = "l_image_sciencegeo_1",
//   ScienceBio1 = "l_image_sciencebio_1",
//   ScienceWhiteboard = "l_image_sciencewhiteboard_1",

//   Television = "l_video_television_1",
//   MovieProjector = "l_video_movieprojector_1",

//   //default
//   Blackboard = "l_h5p_blackboard_1",
//   DeskPC1 = "l_h5p_deskpc_1",
//   DrawingTable = "l_h5p_drawingtable_1",
//   SlotMachine = "l_h5p_slotmachine_1",
//   //arcade
//   Blackboard2 = "l_h5p_blackboard_2",
//   DeskPC3 = "l_h5p_deskpc_3",
//   DrawingTable2 = "l_h5p_drawingtable_2",
//   DaylightProjector = "l_h5p_daylightprojector_1",

//   BronzeTrophy = "l_trophy_bronze",
//   SilverTrophy = "l_trophy_silver",
//   GoldTrophy = "l_trophy_gold",
// }

export const CompabilityElementModelTypesLookUp: {
  [key in string]?: any;
} = {
  l_text_bookshelf_1: "l-text-bookshelf-1",
  l_text_bookshelf_2: "l-text-bookshelf-2",
  l_text_libraryshelf_1: "l-text-libraryshelf-1",
  l_image_painting_1: "l-image-painting-1",
  l_image_painting_2: "l-image-painting-2",
  l_image_paintingeasel_1: "l-image-paintingeasel-1",
  l_image_sciencegeo_1: "l-image-sciencegeo-1",
  l_image_sciencebio_1: "l-image-sciencebio-1",
  l_image_sciencewhiteboard_1: "l-image-sciencewhiteboard-1",
  l_video_television_1: "l-video-television-1",
  l_video_movieprojector_1: "l-video-movieprojector-1",
  l_h5p_blackboard_1: "l-h5p-blackboard-1",
  l_h5p_deskpc_1: "l-h5p-deskpc-1",
  l_h5p_drawingtable_1: "l-h5p-drawingtable-1",
  l_h5p_slotmachine_1: "l-h5p-slotmachine-1",
  l_h5p_blackboard_2: "l-h5p-blackboard-2",
  l_h5p_deskpc_3: "l-h5p-deskpc-3",
  l_h5p_drawingtable_2: "l-h5p-drawingtable-2",
  l_h5p_daylightprojector_1: "l-h5p-daylightprojector-1",
  l_trophy_bronze: "l-trophy-bronze",
  l_trophy_silver: "l-trophy-silver",
  l_trophy_gold: "l-trophy-gold",
};

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
