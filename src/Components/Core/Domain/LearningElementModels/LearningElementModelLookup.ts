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
    .Blackboard]: require("../../../../Assets/3dModels/suburbTheme/l-h5p-blackboard-1.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .DeskPC1]: require("../../../../Assets/3dModels/suburbTheme/l-h5p-deskpc-1.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .DrawingTable]: require("../../../../Assets/3dModels/suburbTheme/l-h5p-drawingtable-1.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .SlotMachine]: require("../../../../Assets/3dModels/suburbTheme/l-h5p-slotmachine-1.glb"),
  [LearningElementModelTypeEnums.TextElementModelTypes
    .Bookshelf1]: require("../../../../Assets/3dModels/suburbTheme/l-text-bookshelf-1.glb"),
  [LearningElementModelTypeEnums.TextElementModelTypes
    .Bookshelf2]: require("../../../../Assets/3dModels/suburbTheme/l-text-bookshelf-2.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .Painting1]: require("../../../../Assets/3dModels/suburbTheme/l-image-painting-1.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .Painting2]: require("../../../../Assets/3dModels/suburbTheme/l-image-painting-2.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .PaintingEasel]: require("../../../../Assets/3dModels/suburbTheme/l-image-paintingeasel-1.glb"),
  [LearningElementModelTypeEnums.VideoElementModelTypes
    .Television]: require("../../../../Assets/3dModels/suburbTheme/l-video-television-1.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .DefaultSuburbNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-teamd-male.glb"),

  //ArcadeTheme
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .GreySlotmachine]: require("../../../../Assets/3dModels/arcadeTheme/l-h5p-greyslotmachine-1.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .RedSlotmachine]: require("../../../../Assets/3dModels/arcadeTheme/l-h5p-redslotmachine-1.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .PurpleSlotmachine]: require("../../../../Assets/3dModels/arcadeTheme/l-h5p-purpleslotmachine-1.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .BlackSlotmachine]: require("../../../../Assets/3dModels/arcadeTheme/l-h5p-blackslotmachine-1.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .DeskPC2]: require("../../../../Assets/3dModels/arcadeTheme/l-h5p-deskpc-2.glb"),
  [LearningElementModelTypeEnums.TextElementModelTypes
    .ComicShelfbig]: require("../../../../Assets/3dModels/arcadeTheme/l-text-comicshelfbig-1.glb"),
  [LearningElementModelTypeEnums.TextElementModelTypes
    .ComicShelfsmall]: require("../../../../Assets/3dModels/arcadeTheme/l-text-comicshelfsmall-1.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .Gameposter1]: require("../../../../Assets/3dModels/arcadeTheme/l-image-gameposter-1.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .Gameposter2]: require("../../../../Assets/3dModels/arcadeTheme/l-image-gameposter-2.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .CardboardCutout]: require("../../../../Assets/3dModels/arcadeTheme/l-image-cardboardcutout-1.glb"),
  [LearningElementModelTypeEnums.VideoElementModelTypes
    .VrDesk]: require("../../../../Assets/3dModels/arcadeTheme/l-video-vrdesk-1.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .DefaultArcadeNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-sheriffjustice.glb"),

  //CampusTheme
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .Blackboard2]: require("../../../../Assets/3dModels/campusTheme/l-h5p-blackboard-2.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .DeskPC3]: require("../../../../Assets/3dModels/campusTheme/l-h5p-deskpc-3.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .DrawingTable2]: require("../../../../Assets/3dModels/campusTheme/l-h5p-drawingtable-2.glb"),
  [LearningElementModelTypeEnums.H5pElementModelTypes
    .DaylightProjector]: require("../../../../Assets/3dModels/campusTheme/l-h5p-daylightprojector-1.glb"),
  [LearningElementModelTypeEnums.TextElementModelTypes
    .LibraryShelf]: require("../../../../Assets/3dModels/campusTheme/l-text-libraryshelf-1.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .ScienceGeo1]: require("../../../../Assets/3dModels/campusTheme/l-image-sciencegeo-1.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .ScienceBio1]: require("../../../../Assets/3dModels/campusTheme/l-image-sciencebio-1.glb"),
  [LearningElementModelTypeEnums.ImageElementModelTypes
    .ScienceWhiteboard]: require("../../../../Assets/3dModels/campusTheme/l-image-sciencewhiteboard-1.glb"),
  [LearningElementModelTypeEnums.VideoElementModelTypes
    .MovieProjector]: require("../../../../Assets/3dModels/campusTheme/l-video-movieprojector-1.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .DefaultCampusNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-teamb-male.glb"),

  //Shared Models - Trophies
  [LearningElementModelTypeEnums.TrophyElementModelTypes
    .BronzeTrophy]: require("../../../../Assets/prototype/l_trophy_bronze.glb"),
  [LearningElementModelTypeEnums.TrophyElementModelTypes
    .SilverTrophy]: require("../../../../Assets/prototype/l_trophy_silver.glb"),
  [LearningElementModelTypeEnums.TrophyElementModelTypes
    .GoldTrophy]: require("../../../../Assets/prototype/l_trophy_gold.glb"),
  //Shared Models - NPCs
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .AleRobotNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-alerobot.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .BullyFemaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-bullylight-female.glb"), // for backwords compability
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .BullyMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-bullylight-male.glb"), // for backwords compability
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .BullyDarkFemaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-bullydark-female.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .BullyDarkMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-bullydark-male.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .BullyLightFemaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-bullylight-female.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .BullyLightMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-bullylight-male.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .DefaultDarkFemaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-defaultdark-female.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .DefaultDarkMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-defaultdark-male.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .DefaultLightMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-defaultlight-male.glb"),

  [LearningElementModelTypeEnums.QuizElementModelTypes
    .DozentAntoniaNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-teame-female.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .DozentDanielNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-teamc-male.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .DozentGeorgNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-teamb-male.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .DozentJoergNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-teamd-male.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .DozentLukasNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-teama-male.glb"),

  [LearningElementModelTypeEnums.QuizElementModelTypes
    .TeamAMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-teama-male.glb"), // for backwords compability
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .TeamBMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-teamb-male.glb"), // for backwords compability
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .TeamCMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-teamc-male.glb"), // for backwords compability
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .TeamDMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-teamd-male.glb"), // for backwords compability
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .TeamEFemaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-teame-female.glb"), // for backwords compability

  [LearningElementModelTypeEnums.QuizElementModelTypes
    .HiphopFemaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-hiphoplight-female.glb"), // for backwords compability
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .HiphopMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-hiphoplight-male.glb"), // for backwords compability
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .HipHopDarkFemaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-hiphopdark-female.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .HipHopDarkMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-hiphopdark-male.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .HipHopLightFemaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-hiphoplight-female.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .HipHopLightMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-hiphoplight-male.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .NerdDarkFemaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-nerddark-female.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .NerdDarkMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-nerddark-male.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .NerdLightFemaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-nerdlight-female.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .NerdLightMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-nerdlight-male.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .OldieDarkFemaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-oldiedark-female.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .OldieDarkMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-oldiedark-male.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .OldieLightFemaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-oldielight-female.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .OldieLightMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-oldielight-male.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .SantaFemaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-santa-female.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .SantaMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-santa-male.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .SheriffJusticeNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-sheriffjustice.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .StudentDarkFemaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-studentdark-female.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .StudentDarkMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-studentdark-male.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .StudentLightFemaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-studentlight-female.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .StudentLightMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-studentlight-male.glb"),
};

export default LearningElementModelLookup;
