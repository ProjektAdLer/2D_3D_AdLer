// None
export const AvatarNoneModel = {
  None: "none",
} as const;

// Hair
export const OAvatarHairModels = {
  MediumPonytail: "hairMediumPonytail",
  MediumStraight: "hairMediumStraight",

  //TODO: add more hair models when assets are available
  // DreadsTopback: "hairDreadsTopback",
  // DreadsBandana: "hairDreadsBandana",
  // DreadsDownknot: "hairDreadsDownknot",
  // Backhead: "hairBackhead",
  // Long: "hairLong",
  // LongBangs: "hairLongBangs",
  // LongClampback: "hairLongClampback",
  // LongWavy: "hairLongWavy",
  // MediumDut: "hairMediumDut",
  // MediumNapoleon: "hairMediumNapoleon",
  // MediumPushedBack: "hairMediumPushedBack",
  // MediumShaggy: "hairMediumShaggy",
  // ShortBald: "hairShortBald",
  // ShortBalding: "hairShortBalding",
  // ShortBaldtop: "hairShortBaldtop",
  // ShortReceding: "hairShortReceding",
  // ShortCurly: "hairShortCurly",
  // ShortFaux: "hairShortFaux",
  // ShortFringeParted: "hairShortFringeParted",
  // ShortFrontParting: "hairShortFrontParting",
  // ShortPigtails: "hairShortPigtails",
  // ShortPigtailsPunk: "hairShortPigtailsPunk",
  // ShortSideFling: "hairShortSideFling",
  // ShortSideFringe: "hairShortSideFringe",
  // ShortSideParting: "hairShortSideParting",
  // ShortVanilla: "hairShortVanilla",
} as const;
export type AvatarHairModels =
  | (typeof AvatarNoneModel)[keyof typeof AvatarNoneModel]
  | (typeof OAvatarHairModels)[keyof typeof OAvatarHairModels];

// Beards
export const OAvatarBeardModels = {
  //TODO: add more beard models when assets are available
  Medium: "beardMedium",
  MustacheHogan: "beardMustacheHogan",
} as const;
export type AvatarBeardModels =
  | (typeof AvatarNoneModel)[keyof typeof AvatarNoneModel]
  | (typeof OAvatarBeardModels)[keyof typeof OAvatarBeardModels];

export enum AvatarHeadgearModels {}

export enum AvatarGlassesModels {}

export enum AvatarShirtModels {}

export enum AvatarPantsModels {}

export enum AvatarShoesModels {}
