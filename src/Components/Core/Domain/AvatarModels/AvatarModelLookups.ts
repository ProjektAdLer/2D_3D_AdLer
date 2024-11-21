import {
  AvatarBeardModels,
  AvatarGlassesModels,
  AvatarHairModels,
  AvatarHeadgearModels,
  AvatarPantsModels,
  AvatarShirtModels,
} from "./AvatarModelTypes";

export const AvatarHairModelsLookup: {
  [key in AvatarHairModels]: any;
} = {
  [AvatarHairModels.PLACEHOLDER]: require("../../../Assets/AvatarModels/hair_placeholder.png"), // TODO: replace with actual asset
};

export const AvatarBeardModelsLookup: {
  [key in AvatarBeardModels]: any;
} = {};

export const AvatarHeadgearModelsLookup: {
  [key in AvatarHeadgearModels]: any;
} = {};

export const AvatarGlassesModelsLookup: {
  [key in AvatarGlassesModels]: any;
} = {};

export const AvatarShirtModelsLookup: {
  [key in AvatarShirtModels]: any;
} = {};

export const AvatarPantsModelsLookup: {
  [key in AvatarPantsModels]: any;
} = {};

export const AvatarShoesModelsLookup: {
  [key in AvatarShirtModels]: any;
} = {};
