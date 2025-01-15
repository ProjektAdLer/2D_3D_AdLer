// None
export const AvatarNoneModel = {
  None: "none",
} as const;

// Hair
export const OAvatarHairModels = {
  MediumPonytail: "hair-medium-ponytail",
  MediumStraight: "hair-medium-straight",
  Backhead: "hair-backhead",
  Long: "hair-long",

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
  BeardFullFriendlyMuttonchops: "beard-full-friendly-muttonchops",
  BeardFullLong: "beard-full-long",
  BeardFullMuttonchops: "beard-full-muttonchops",
  BeardFullShort: "beard-full-short",
  BeardFullStubble: "beard-full-stubble",
  BeardMediumAnchor: "beard-medium-anchor",
  BeardMediumCircle: "beard-medium-circle",
  BeardMustacheDad: "beard-mustache-dad",
  BeardMustacheHogan: "beard-mustache-hogan",
  BeardMustacheHorseshoe: "beard-mustache-horseshoe",
  BeardMustacheKnightly: "beard-mustache-knightly",
  BeardMustachePencil: "beard-mustache-pencil",
  BeardMustacheSir: "beard-mustache-sir",
  BeardMustacheThick: "beard-mustache-thick",
  BeardMustacheWise: "beard-mustache-wise",
} as const;

export type AvatarBeardModels =
  | (typeof AvatarNoneModel)[keyof typeof AvatarNoneModel]
  | (typeof OAvatarBeardModels)[keyof typeof OAvatarBeardModels];

export enum AvatarHeadgearModels {}

export enum AvatarGlassesModels {}

export enum AvatarShirtModels {}

export enum AvatarPantsModels {}

export enum AvatarShoesModels {}
