import {
  AvatarBeardModels,
  AvatarGlassesModels,
  AvatarHairModels,
  AvatarHeadgearModels,
  AvatarPantsModels,
  AvatarShirtModels,
  AvatarShoesModels,
} from "../AvatarModels/AvatarModelTypes";

/*
 * models: string enum index
 * textures: index on texture palette, dimensions of palette need to be defined somewhere
 * color: index on color palette, dimensions of palette need to be defined somewhere
 * morph targets: 0-1
 */

export default class AvatarEntity {
  // Face (all texture indices)
  public eyebrows: number;
  public eyes: number;
  public nose: number;
  public mouth: number;

  // Hair
  public hair: AvatarHairModels;
  public beard: AvatarBeardModels;
  public hairColor: number;

  // Accessories
  public headgear: AvatarHeadgearModels;
  public glasses: AvatarGlassesModels;
  // TODO: add more accessories when assets are available

  // Clothes
  public shirt: AvatarShirtModels;
  public shirtColor: number;
  public pants: AvatarPantsModels;
  public pantsColor: number;
  public shoes: AvatarShoesModels;
  public shoesColor: number;

  // Body
  public skinColor: number;
  public roundness: number; // 0-1 morph target weight
  // TODO: add more body features
}