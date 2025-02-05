import Observable from "src/Lib/Observable";
import { AvatarColor } from "../../Domain/AvatarModels/AvatarColorPalette";
import {
  AvatarHairModels,
  AvatarBeardModels,
  AvatarHeadgearModels,
  AvatarGlassesModels,
  AvatarShirtModels,
  AvatarPantsModels,
  AvatarShoesModels,
  AvatarBackpackModels,
  AvatarOtherModels,
} from "../../Domain/AvatarModels/AvatarModelTypes";
import AvatarSkinColorPalette from "../../Domain/AvatarModels/AvatarSkinColorPalette";

export default class AvatarEditorViewModel {
  hasChanged = new Observable<boolean>(false);
  // Face
  eyebrows: Observable<number> = new Observable<number>(0);
  eyes: Observable<number> = new Observable<number>(0);
  nose: Observable<number> = new Observable<number>(0);
  mouth: Observable<number> = new Observable<number>(0);

  // Hair
  hair: Observable<AvatarHairModels> = new Observable<AvatarHairModels>("none");
  beard: Observable<AvatarBeardModels> = new Observable<AvatarBeardModels>(
    "none",
  );
  hairColor: Observable<AvatarColor> = new Observable<AvatarColor>({
    id: 1,
    nameKey: "Black 1",
    hexColor: "#000000",
  });

  // Accessories
  headgear: Observable<AvatarHeadgearModels> =
    new Observable<AvatarHeadgearModels>("none");
  glasses: Observable<AvatarGlassesModels> =
    new Observable<AvatarGlassesModels>("none");
  backpack: Observable<AvatarBackpackModels> =
    new Observable<AvatarBackpackModels>("none");
  other: Observable<AvatarOtherModels> = new Observable<AvatarOtherModels>(
    "none",
  );

  // Clothes
  shirt: Observable<AvatarShirtModels> = new Observable<AvatarShirtModels>(
    "shirts-sweatshirt",
  );
  shirtColor: Observable<AvatarColor> = new Observable<AvatarColor>({
    id: 1,
    nameKey: "Black 1",
    hexColor: "#000000",
  });
  pants: Observable<AvatarPantsModels> = new Observable<AvatarPantsModels>(
    "pants-jeans",
  );
  pantsColor: Observable<AvatarColor> = new Observable<AvatarColor>({
    id: 1,
    nameKey: "Black 1",
    hexColor: "#000000",
  });
  shoes: Observable<AvatarShoesModels> = new Observable<AvatarShoesModels>(
    "shoes-trainers",
  );
  shoesColor: Observable<AvatarColor> = new Observable<AvatarColor>({
    id: 1,
    nameKey: "Black 1",
    hexColor: "#000000",
  });

  // Body
  skinColor: Observable<AvatarColor> = new Observable<AvatarColor>(
    AvatarSkinColorPalette[4],
  );
  roundness: Observable<number>; // 0-1 morph target weight

  // --------------------------------------------------------------
  // UI Component Visibility
  // --------------------------------------------------------------

  uiVisiblity: AvatarEditorUI = {
    hairMenu: {
      hairstyles: new Observable<boolean>(true),
      beards: new Observable<boolean>(true),
    },
    faceMenu: {
      eyebrows: new Observable<boolean>(true),
      eyes: new Observable<boolean>(false),
      noses: new Observable<boolean>(false),
      mouths: new Observable<boolean>(false),
    },
    accessoireMenu: {
      headGear: new Observable<boolean>(true),
      glasses: new Observable<boolean>(false),
      backpack: new Observable<boolean>(false),
      other: new Observable<boolean>(false),
    },
    clothingMenu: {
      shirts: new Observable<boolean>(true),
      pants: new Observable<boolean>(false),
      shoes: new Observable<boolean>(false),
    },
  };
}

export interface AvatarConfigHairIconVisibility {
  hairstyles: Observable<boolean>;
  beards: Observable<boolean>;
}

export interface AvatarConfigFaceIconVisibility {
  eyebrows: Observable<boolean>;
  eyes: Observable<boolean>;
  noses: Observable<boolean>;
  mouths: Observable<boolean>;
}

export interface AvatarConfigAccessoireIconVisibility {
  headGear: Observable<boolean>;
  glasses: Observable<boolean>;
  backpack: Observable<boolean>;
  other: Observable<boolean>;
}

export interface AvatarConfigClothingIconVisibility {
  shirts: Observable<boolean>;
  pants: Observable<boolean>;
  shoes: Observable<boolean>;
}

export interface AvatarEditorUI {
  hairMenu: AvatarConfigHairIconVisibility;
  faceMenu: AvatarConfigFaceIconVisibility;
  accessoireMenu: AvatarConfigAccessoireIconVisibility;
  clothingMenu: AvatarConfigClothingIconVisibility;
}
