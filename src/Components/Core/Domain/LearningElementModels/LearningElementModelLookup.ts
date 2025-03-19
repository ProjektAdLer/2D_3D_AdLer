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
    .DefaultNPC]: require("../../../../Assets/3dModels/suburbTheme/a-npc-defaultnpc.glb"),

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
    .ArcadeNPC]: require("../../../../Assets/3dModels/arcadeTheme/a-npc-sheriffjustice.glb"),

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
    .CampusNPC]: require("../../../../Assets/3dModels/campusTheme/a-npc-dozentlukas.glb"),

  //sharedModels
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .RobotNPC]: require("../../../../Assets/3dModels/sharedModels/a_npc_alerobot.glb"),
  [LearningElementModelTypeEnums.TrophyElementModelTypes
    .BronzeTrophy]: require("../../../../Assets/prototype/l_trophy_bronze.glb"),
  [LearningElementModelTypeEnums.TrophyElementModelTypes
    .SilverTrophy]: require("../../../../Assets/prototype/l_trophy_silver.glb"),
  [LearningElementModelTypeEnums.TrophyElementModelTypes
    .GoldTrophy]: require("../../../../Assets/prototype/l_trophy_gold.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .NerdFemaleDarkNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-averagenerdfemaledark.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .NerdFemaleLightNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-averagenerdfemalelight.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .NerdMaleDarkNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-averagenerdmaledark.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .NerdMaleLightNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-averagenerdmalelight.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .BullyFemaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-bullyfemale.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .BullyMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-bullymale.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .DefaultMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-defaultmale.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .DozentAntoniaNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-dozentantonia.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .DozentDanielNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-dozentdaniel.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .DozentGeorgNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-dozentgeorg.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .DozentJoergNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-dozentjoerg.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .HiphopFemaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-hiphopfemale.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .HiphopMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-hiphopmale.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .SantaFemaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-santafemale.glb"),
  [LearningElementModelTypeEnums.QuizElementModelTypes
    .SantaMaleNPC]: require("../../../../Assets/3dModels/sharedModels/npcs/a-npc-santamale.glb"),
};

export default LearningElementModelLookup;
