// None
export const AvatarNoneModel = {
  None: "none",
} as const;

// Hair
export const OAvatarHairModels = {
  HairBackhead: "hair-backhead",
  HairDreadsBandana: "hair-dreads-bandana",
  HairDreadsDownknot: "hair-dreads-downknot",
  HairDreadsTopback: "hair-dreads-topback",
  HairLongBangs: "hair-long-bangs",
  HairLongClampback: "hair-long-clampback",
  HairLongWavy: "hair-long-wavy",
  HairLong: "hair-long",
  HairMediumDut: "hair-medium-dut",
  HairMediumNapoleon: "hair-medium-napoleon",
  HairMediumPonytail: "hair-medium-ponytail",
  HairMediumPushedBack: "hair-medium-pushed-back",
  HairMediumShaggy: "hair-medium-shaggy",
  HairMediumStraight: "hair-medium-straight",
  HairShortBald: "hair-short-bald",
  HairShortBalding: "hair-short-balding",
  HairShortBaldtop: "hair-short-baldtop",
  HairShortCurly: "hair-short-curly",
  HairShortFaux: "hair-short-faux",
  HairShortFringeParted: "hair-short-fringe-parted",
  HairShortFrontParting: "hair-short-front-parting",
  HairShortNerdy: "hair-short-nerdy",
  HairShortPigtails: "hair-short-pigtails",
  HairShortPigtailsPunk: "hair-short-pigtails-punk",
  HairShortReceding: "hair-short-receding",
  HairShortSideFling: "hair-short-side-fling",
  HairShortSideFringe: "hair-short-side-fringe",
  HairShortSideParting: "hair-short-side-parting",
  HairShortVanilla: "hair-short-vanilla",
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

export const OAvatarHeadGearModels = {
  HatsCowboy: "hats-cowboy",
  HatsCylinder: "hats-cylinder",
  HatsFroghat: "hats-froghat",
  HatsKecap: "hats-kecap",
  HatsSanta: "hats-santa",
  HatsUniversity: "hats-university",
  HatsVrgoggle: "hats-vrgoggle",
  HatsWitch: "hats-witch",
} as const;

export type AvatarHeadgearModels =
  | (typeof AvatarNoneModel)[keyof typeof AvatarNoneModel]
  | (typeof OAvatarHeadGearModels)[keyof typeof OAvatarHeadGearModels];

export const OAvatarGlassesModels = {
  GlassesBrowline: "glasses-browline",
  GlassesCateye: "glasses-cateye",
  GlassesDealwithit: "glasses-dealwithit",
  GlassesHeart: "glasses-heart",
  GlassesMonocle: "glasses-monocle",
  GlassesOval: "glasses-oval",
  GlassesReading: "glasses-reading",
  GlassesRectangle: "glasses-rectangle",
  GlassesRound: "glasses-round",
  GlassesSunglass: "glasses-sunglass",
} as const;

export type AvatarGlassesModels =
  | (typeof AvatarNoneModel)[keyof typeof AvatarNoneModel]
  | (typeof OAvatarGlassesModels)[keyof typeof OAvatarGlassesModels];

export const OAvatarBackpackModels = {
  BackpackSantapack: "backpack-santapack",
  BackpackThreepouchpack: "backpack-threepouchpack",
} as const;

export type AvatarBackpackModels =
  | (typeof AvatarNoneModel)[keyof typeof AvatarNoneModel]
  | (typeof OAvatarBackpackModels)[keyof typeof OAvatarBackpackModels];

export enum AvatarShirtModels {}

export enum AvatarPantsModels {}

export enum AvatarShoesModels {}
