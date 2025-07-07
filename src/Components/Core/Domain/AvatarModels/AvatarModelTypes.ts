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

// Accessories
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

export const OAvatarOtherModels = {
  OtherSheriffStar: "other-sheriff-star",
} as const;

export type AvatarOtherModels =
  | (typeof AvatarNoneModel)[keyof typeof AvatarNoneModel]
  | (typeof OAvatarOtherModels)[keyof typeof OAvatarOtherModels];

//clothing
export const OAvatarPantsModels = {
  PantsCloud: "pants-pantscloud",
  PantsCargo: "pants-cargo",
  PantsFlared: "pants-flared",
  PantsJeans: "pants-jeans",
  PantsSanta: "pants-santa",
  PantsStockings: "pants-stockings",
} as const;

export type AvatarPantsModels =
  (typeof OAvatarPantsModels)[keyof typeof OAvatarPantsModels];

export const OAvatarShirtModels = {
  ShirtCloud: "shirts-topcloud",
  ShirtsDress: "shirts-dress",
  ShirtsHoodie: "shirts-hoodie",
  ShirtsLongdress: "shirts-longdress",
  ShirtsSweatshirt: "shirts-sweatshirt",
  ShirtsTopcoatsanta: "shirts-topcoatsanta",
  ShirtsTopdresssanta: "shirts-topdresssanta",
  ShirtsVest: "shirts-vest",
} as const;

export type AvatarShirtModels =
  (typeof OAvatarShirtModels)[keyof typeof OAvatarShirtModels];

export const OAvatarShoesModels = {
  ShoesCloud: "shoes-shoescloud",
  ShoesBoots: "shoes-boots",
  ShoesSantaboots: "shoes-santaboots",
  ShoesSantaheels: "shoes-santaheels",
  ShoesTrainers: "shoes-trainers",
} as const;

export type AvatarShoesModels =
  (typeof OAvatarShoesModels)[keyof typeof OAvatarShoesModels];
