import { AvatarColor } from "../../Domain/AvatarModels/AvatarColorPalette";
import {
  AvatarBackpackModels,
  AvatarBeardModels,
  AvatarGlassesModels,
  AvatarHairModels,
  AvatarHeadgearModels,
  AvatarOtherModels,
  AvatarPantsModels,
  AvatarShirtModels,
  AvatarShoesModels,
} from "../../Domain/AvatarModels/AvatarModelTypes";

export default class AvatarConfigTO {
  // Face
  public eyebrows: number;
  public eyes: number;
  public nose: number;
  public mouth: number;

  // Hair
  public hair: AvatarHairModels;
  public beard: AvatarBeardModels;
  public hairColor: AvatarColor;

  // Accessories
  public headgear: AvatarHeadgearModels;
  public glasses: AvatarGlassesModels;
  public backpack: AvatarBackpackModels;
  public other: AvatarOtherModels;

  // Clothes
  public shirt: AvatarShirtModels;
  public shirtColor: AvatarColor;
  public pants: AvatarPantsModels;
  public pantsColor: AvatarColor;
  public shoes: AvatarShoesModels;
  public shoesColor: AvatarColor;

  // Body
  public skinColor: AvatarColor;
  public roundness: number; // 0-1 morph target weight
  // TODO: add more body features
}
