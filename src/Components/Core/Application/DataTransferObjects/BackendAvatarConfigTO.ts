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

export class BackendAvatarConfigTO {
  // Face
  public eyebrows: string;
  public eyes: string;
  public nose: string;
  public mouth: string;

  // Hair
  public hair: AvatarHairModels;
  public beard: AvatarBeardModels;
  public hairColor: number;

  // Accessories
  public headgear: AvatarHeadgearModels;
  public glasses: AvatarGlassesModels;
  public backpack: AvatarBackpackModels;
  public other: AvatarOtherModels;

  // Clothes
  public shirt: AvatarShirtModels;
  public shirtColor: number;
  public pants: AvatarPantsModels;
  public pantsColor: number;
  public shoes: AvatarShoesModels;
  public shoesColor: number;

  // Body
  public skinColor: string;
  public roundness: number; // 0-1 morph target weight
  // TODO: add more body features
}
